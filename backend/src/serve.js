import mongoose from "mongoose";
import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado a o banco")
}).catch((err) => {
    console.log(err)
});



app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`)
})




