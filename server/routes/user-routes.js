import express from 'express';
import userController from '../controllers/user-controller';
// import config from '../../config/config';


const router = express.Router();


router.route('/')
  /** GET /api/users - Get list of users */
  .get(userController.getAll)

  /** POST /api/users - Add new user */
  .post(userController.add);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userController.get)

// /** PUT /api/users/:userId - Update user */
// .put(userController.update)

// /** DELETE /api/users/:userId - Delete user */
// .delete(userController.delete);

/** Load user when userID route param is hit */
router.param('userId', userController.load);

export default router;