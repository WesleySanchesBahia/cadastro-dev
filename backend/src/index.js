import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import Dev from "./models/Dev.js";


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

/* 
    Buscar todos os devs
*/
app.get("/dev", async (req, res) => {
    try {
        const devs =  await Dev.find();
        return res.status(200).json({content:devs});
        
    } catch (error) {
        return res.status(500).json({erro: error})
    }
})
/* 
    Buscar todos os dev por parametro;
*/
app.get("/dev/search", async (req, res) => {
    const findName = req.query.name;
    try {

        const dev =  await Dev.find({ name: { $regex: findName, $options: "i" } });
        return res.status(200).json({content:dev});
        
    } catch (error) {
        return res.status(500).json({erro: error})
    }
})

/* 
    Para criar um novo dev
*/
app.post("/dev", async (req, res) => {
    try {
        if(req.body){
            const newDev = await  Dev.create(req.body);
            return res.status(201).json(newDev);
        }
    } catch (error) {
        
        console.log("Error ao salvar User:", error)
    }

})
/* 
    Para atualizar algum  dado 
*/
app.put("/dev/:id", async (req, res) => {
    const id = req.params.id;
    await Dev.findByIdAndUpdate(id, req.body)
    return res.status(200).json(true);
})
/* 
    Para atualizar algum  dado 
*/
app.delete("/dev/:id", async (req, res) => {
    await Dev.findByIdAndDelete(req.params.id);
    return res.status(204).json(true);
})


app.listen(PORT, () => {
    console.log(`App rodando em http://localhost:${PORT}`)
})




