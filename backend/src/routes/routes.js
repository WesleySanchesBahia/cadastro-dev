import { Router } from "express";

const routes = new Router();
import devs from "../app/controllers/DevController.js";

routes.get("/dev", devs.list);
routes.get("/dev/search", devs.show);
routes.post("/dev", devs.create);
routes.put("/dev/:id", devs.update);
routes.delete("/dev/:id", devs.delete);


export default routes;