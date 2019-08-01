import router from "express"
// initialize Router
const appRouter = router();

import requestControllers from "../controllers/index";

appRouter.get('/' , (req , res)=>{
    res.status("200").send("HOMEPAGE [TRACKY REQUEST API]");
})

//  sending a get request
appRouter.get('/api/v1/users/requests' , requestControllers.allRequests);

// get request by <id>
appRouter.get('/api/v1/users/requests/:id' , requestControllers.getRequestById);

// post a request
appRouter.post('/api/v1/users/requests' , requestControllers.createRequest);

//
appRouter.get("*" , (req , res)=>{
    res.status(404).send("404 file not found");
})

export default appRouter;