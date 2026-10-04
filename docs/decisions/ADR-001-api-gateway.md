# ADR-001: Use an API Gateway

## Status

Accepted

## Context

NexusCore contains multiple backend services.

The frontend should not need to know the network location and internal structure of each service.

## Decision

Use a dedicated API Gateway as the public entry point for the backend API requests.

## Responsibilities

- Request Routing
- Authentication
- Rate limiting
- Security Middleware
- Request logging

## Alternatives Considered

### Direct frontend -> services

Rejected because it exposes internal service boundaries to the client and duplicates cross-cutting concerns.

### Reverse proxy only

Not sufficient for application-level authentication and API policies.

### Consequences

### Benefits

- Single public API entry point
- Centralized cross-cutting concerns
- Internal services remain private

### Costs

- Additional service
- Gateway becomes an important dependency
- Requires monitoring and scaling
