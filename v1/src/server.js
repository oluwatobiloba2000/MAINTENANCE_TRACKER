// path
import path from 'path';

// import express
import express from "express";

// import environmental variable
import dotenv from "dotenv"

// import body-parser
import bodyParser from "body-parser"

import cors from 'cors';

// import routes
import appRouter from "./routes"

// initialize express
const app = express();

app.use(cors());

// initialize dotenv
dotenv.config();


app.use(bodyParser.json({
    extended: true
}));


app.use((req, res, next) => {
     // allow all routes
   res.setHeader('Access-Control-Allow-Origin', '*');

    // allow methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');

    // allow request headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})
// configure path to load html files
const frontend = path.join(__dirname, '../../UI');

app.use(express.static(frontend));

app.use(appRouter);


// declear a port to run on
const PORT = process.env.PORT || 3000;



// start the server
app.listen(PORT, () => {
    console.log(`app running on localhost:${PORT}`)
});

//exporting app for testing purposes
export default app;