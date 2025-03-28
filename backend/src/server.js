import mongoose from "mongoose";
import app from "./app.js";
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/DevDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado a o banco")
}).catch((err) => {
    console.log(err)
});



app.listen(PORT, () => {
    console.log(`App rodando em http://localhost:${PORT}`)
})




