// import express
import express from "express";

// import environmental variable
import dotenv from "dotenv"

// import body-parser
import bodyParser from "body-parser"

import cors from 'cors';

// import routes
import appRouter from "./routes"

// initialize dotenv
dotenv.config();

// initialize express
const app = express();

app.use(bodyParser.json({extended : true}));


app.use(cors());

app.use(appRouter);


// declear a port to run on
const PORT = process.env.PORT || 3000;

// start the server
app.listen(PORT , ()=>{console.log(`app running on localhost:${PORT}`)});

//exporting app for testing purposes
export default app;