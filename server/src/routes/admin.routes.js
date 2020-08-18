import router from "express";
import AdminControllers from "../controllers/admin.controller";
import {checkAdminToken} from '../middlewares/checkToken';

const appRouter = router();

//[getting current profile for admin]
appRouter.get('/me', checkAdminToken, AdminControllers.gettingProfile);
appRouter.get('/request', checkAdminToken, AdminControllers.allRequestsAdmin);
appRouter.put('/request/approve/:id', checkAdminToken, AdminControllers.approveRequest);
appRouter.put('/request/resolve/:id', checkAdminToken, AdminControllers.resolveRequest);
appRouter.put('/request/disapprove/:id', checkAdminToken, AdminControllers.disapproveRequest);
appRouter.get('/users/all', checkAdminToken, AdminControllers.allUsers);
appRouter.get('/stats', checkAdminToken, AdminControllers.stats);
export default appRouter;