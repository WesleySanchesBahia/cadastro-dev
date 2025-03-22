import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import devs from "./app/controllers/ControllerDev.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;


mongoose.connect("mongodb://127.0.0.1:27017/DevDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado a o banco")
}).catch((err) => {
    console.log(err)
});

//Routes Dev
app.get("/dev", devs.list);
app.get("/dev/search", devs.show)
app.post("/dev", devs.create)
app.put("/dev/:id", devs.update)
app.delete("/dev/:id", devs.delete)


app.listen(PORT, () => {
    console.log(`App rodando em http://localhost:${PORT}`)
})




