require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

//Criar conexão com o Mongo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// model do usuário
const UserSchema = new mongoose.Schema({
    githubUsername: String,
    avatarUrl: String,
    name: String,
    email: String,
    city: String,
    education: String,
    technologies: String,

});
const User = mongoose.model('User', UserSchema);

// Rotas CRUD

// Para criar usuário
app.post('/users', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoUsuario = new User({ nome, email });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os os usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar usuário
app.put('/users/:id', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const usuarioAtualizado = await User.findByIdAndUpdate(req.params.id, { nome, email }, { new: true });
    if (!usuarioAtualizado) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar usuário
app.delete('/users/:id', async (req, res) => {
  try {
    const usuarioRemovido = await User.findByIdAndDelete(req.params.id);
    if (!usuarioRemovido) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar Servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
