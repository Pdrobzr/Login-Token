const express = require('express');
const usuariosController = require('./controllers/usuariosController');
const verificarToken = require('./middlewares/verificarToken');

const router = express.Router();

router.post('/registrar' , usuariosController.registrarUsuario);

router.post('/login', usuariosController.autenticarUsuario);

router.get('/usuarios' , usuariosController.listarUsuarios);

router.get('/data' , verificarToken , (_req, res) => res.json({message: 'Página protegida!'}));

router.delete('/usuarios/:id', usuariosController.deletarUsuario);

module.exports = router;