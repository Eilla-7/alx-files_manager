import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';


function controllerRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/status', AppController.getStatus);
  router.get('/stats', AppController.getStats);
  router.post('/users', UsersController.postNew);
  router.post('/files', FilesController.postUpload);
  router.get('/connect', AuthController.getConnect);
  router.get('/disconnect', AuthController.getDisconnect);
  router.get('/users/me', UserController.getMe);
}
export default controllerRouting;
