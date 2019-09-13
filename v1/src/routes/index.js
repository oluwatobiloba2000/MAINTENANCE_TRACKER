import router from "express"
import {
    Authentication,
    checkToken
} from '../auth/index';
import requestControllers from "../controllers/index";

// initialize Router
const appRouter = router();

appRouter.get('/', (req, res) => {
    res.status("200").send("WELCOME TRACKY REQUEST API V1");
})

//signing up users
appRouter.post('/auth/signup', Authentication.signUp);

// loginin in a user
appRouter.post('/auth/login', Authentication.logInAuthUser);

//[getting current profile for users]
appRouter.get('/api/v1/user/:userid/profile', checkToken, requestControllers.gettingProfile);

// [updating profile for users]
appRouter.put('/api/v1/user/:userid/update',checkToken, requestControllers.updateProfile);

//  getting all request[only for users]
appRouter.get('/api/v1/:userId/requests', checkToken , requestControllers.allRequests);

//[GETTING ALL LOGGED IN USERS FOR ONLY ADMIN]
appRouter.get('/api/v1/admin/allusers', checkToken, requestControllers.allloggedinusers);

//  sending a get request for admin[only admin has access to this]
appRouter.get('/api/v1/requests', checkToken , requestControllers.allRequestsAdmin);

// get request by <id>
appRouter.get('/api/v1/users/requests/:id', checkToken , requestControllers.getRequestById);

// post a request
appRouter.post('/api/v1/users/requests', checkToken , requestControllers.createRequest);

//editing a request
appRouter.put('/api/v1/users/requests/:id', checkToken,  requestControllers.updateRequest)

//approve a request[only admin has access to this]
appRouter.put('/api/v1/requests/:id/approve', checkToken, requestControllers.approveRequest)

//resolving a request[only admin has access to this]
appRouter.put('/api/v1/requests/:id/resolve', checkToken, requestControllers.resolveRequest)

//disapprove a request[only admin has access to this]
appRouter.put('/api/v1/requests/:id/disapprove', checkToken, requestControllers.disapproveRequest)

//deleting a request[only for users]
appRouter.delete('/api/v1/requests/:id', checkToken, requestControllers.deleteRequests)

appRouter.get("*", (req, res) => {
    res.status(404).send(`<div style="height: 90vh; width: 100%; margin: 0px; display: flex; justify-content: center; align-items: center; flex-direction: column">
    <h1 style="color: #05668D; font-size: 200px;">404</h1><h2>Page not found please go back to the previous page</h3></div>`);
})

export default appRouter;