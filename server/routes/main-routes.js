import express from 'express';
import userRoutes from './user-routes';

const router = express.Router();

/** GET /ping - Check service connection */
router.get('/ping', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

export default router;