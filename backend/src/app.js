import express from "express";
import routes from "./routes/routes.js";
import cors from "cors";

const corsOptions = {
    origin: 'https://cadastro-dev-iota.vercel.app',
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