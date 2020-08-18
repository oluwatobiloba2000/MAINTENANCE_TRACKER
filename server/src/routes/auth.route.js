import router from 'express';
import Authentication from '../auth/index';

const appRouter = router();

appRouter.post('/login', Authentication.login);
appRouter.post('/signup', Authentication.signup);

module.exports = appRouter;