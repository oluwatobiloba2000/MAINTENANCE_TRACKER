import morgan from 'morgan';

// import express
import express from "express";

// import environmental variable
import dotenv from "dotenv"

// import body-parser
import bodyParser from "body-parser"

import cors from 'cors';

// import routes
import userRouters from "./server/v2/src/routes/user.route";
import authRouters from './server/v2/src/routes/auth.route';
import adminRouters from './server/v2/src/routes/admin.routes';
//v1 route
import appv1Routers from './server/v1/src/routes';

// initialize express
const app = express();

app.use(morgan("dev"))
app.use(cors());

// initialize dotenv
dotenv.config();


app.use(bodyParser.json({
    extended: true
}));

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'maintenance tracker Api v2',
        createdat: 'Aug 18, 2020',
        code: 200,
        apiStatus: 'Up and running',
        createdby: 'Anani Oluwatobiloba'
    });
})
// app.use((req, res, next) => {
//      // allow all routes
//    res.setHeader('Access-Control-Allow-Origin', '*');

//     // allow methods
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');

//     // allow request headers
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// })

// // Add headers
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'https://tracky-maintenance-app.herokuapp.com');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

// v1 route
app.use('/api/v1/', appv1Routers);

//v2 routes
app.use('/api/v2/auth/', authRouters);
app.use('/api/v2/user/', userRouters);
app.use('/api/v2/admin/', adminRouters);
app.all("*", (req, res) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'route not found'
    });
})

// declear a port to run on
const PORT = process.env.PORT || 3000;



// start the server
app.listen(PORT, () => {
    console.log(`app running on localhost:${PORT}`)
});

//exporting app for testing purposes
export default app;
