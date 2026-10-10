import { Router } from 'express';

const gatewayRouter: Router = Router();

gatewayRouter.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Healthy...',
  });
});

export { gatewayRouter };
