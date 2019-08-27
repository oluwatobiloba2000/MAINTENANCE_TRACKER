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

//  sending a get request[only for users]
appRouter.get('/api/v1/users/requests', checkToken , requestControllers.allRequests);

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

appRouter.get("*", (req, res) => {
    res.status(404).send("404 route not found");
})

export default appRouter;