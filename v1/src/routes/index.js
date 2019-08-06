import router from "express"
import requestControllers from "../controllers/index";

// initialize Router
const appRouter = router();

appRouter.get('/', (req, res) => {
    res.status("200").send("WELCOME TRACKY REQUEST API V1");
})