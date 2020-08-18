import router from 'express';
import {checkUserToken} from '../middlewares/checkToken';
import UsersController from '../controllers/user.controller';

const appRouter = router();

appRouter.get('/me', checkUserToken, UsersController.gettingProfile);
appRouter.put('/me/edit', checkUserToken, UsersController.updateProfile);
appRouter.get('/request', checkUserToken, UsersController.allRequests);
appRouter.get('/request/:id', checkUserToken, UsersController.getRequestById);
appRouter.post('/request/create', checkUserToken, UsersController.createRequest);
appRouter.put('/request/edit/:id', checkUserToken, UsersController.updateRequest);
appRouter.delete('/request/:id', checkUserToken, UsersController.deleteRequests);


module.exports = appRouter;