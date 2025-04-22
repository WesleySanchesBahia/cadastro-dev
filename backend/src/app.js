import express from "express";
import routes from "./routes/routes.js";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
const domainProd = process.env.DOMAIN_PROD ||  "http://localhost:4200";

const corsOptions = {
    origin: domainProd,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }


    middlewares(){
        this.server.use(cors(corsOptions));
        this.server.use(express.json());
        this.server.use(express.urlencoded({extended: false}))
    }


    routes() {
        this.server.use(routes);
    };
}


export default new App().server;