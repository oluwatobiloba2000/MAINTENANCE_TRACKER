import router from "express"
import requestControllers from "../controllers/index";
// initialize Router
const appRouter = router();


appRouter.get('/' , (req , res)=>{
    res.status("200").send("WELCOME TRACKY REQUEST API V1");
})

//  sending a get request
appRouter.get('/api/v1/users/requests' , requestControllers.allRequests);

// get request by <id>
appRouter.get('/api/v1/users/requests/:id' , requestControllers.getRequestById);

// post a request
appRouter.post('/api/v1/users/requests' , requestControllers.createRequest);

//editing a request
appRouter.put('/api/v1/users/requests/:id', requestControllers.updateRequest)


appRouter.get("*" , (req , res)=>{
    res.status(404).send("404 file not found");
})

export default appRouter;