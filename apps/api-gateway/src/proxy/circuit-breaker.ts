export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeout: number;
}

export class CircuitOpenError extends Error {
  constructor() {
    super('Circuit breaker is OPEN. Request rejected.');
    this.name = 'CircuitOpenError';
  }
}

export class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failures = 0;
  private openedAt = 0;
  private probeInProgress = false;

  constructor(private readonly options: CircuitBreakerOptions) {
    if (!Number.isInteger(options.failureThreshold) || options.failureThreshold < 1) {
      throw new Error('failureThreshold must be a positive integer.');
    }

    if (!Number.isFinite(options.resetTimeout) || options.resetTimeout <= 0) {
      throw new Error('resetTimeout must be greater than zero.');
    }
  }

  getState(): CircuitState {
    return this.state;
  }

  getFailureCount(): number {
    return this.failures;
  }

  canRequest(): boolean {
    if (this.state === 'CLOSED') {
      return true;
    }

    if (this.state === 'HALF_OPEN') {
      if (this.probeInProgress) {
        return false;
      }

      this.probeInProgress = true;
      return true;
    }

    const elapsed = Date.now() - this.openedAt;

    if (elapsed < this.options.resetTimeout) {
      return false;
    }

    this.state = 'HALF_OPEN';
    this.probeInProgress = true;

    return true;
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (!this.canRequest()) {
      throw new CircuitOpenError();
    }

    const isProbe = this.state === 'HALF_OPEN';

    try {
      const result = await operation();

      this.onSuccess(isProbe);

      return result;
    } catch (error: unknown) {
      this.onFailure(isProbe);

      throw error;
    }
  }

  private onSuccess(isProbe: boolean): void {
    this.failures = 0;

    if (isProbe) {
      this.state = 'CLOSED';
      this.probeInProgress = false;
      this.openedAt = 0;
    }
  }

  private onFailure(isProbe: boolean): void {
    this.failures++;

    if (isProbe || this.failures >= this.options.failureThreshold) {
      this.openCircuit();
      return;
    }

    this.probeInProgress = false;
  }

  private openCircuit(): void {
    this.state = 'OPEN';
    this.openedAt = Date.now();
    this.probeInProgress = false;
  }
}
