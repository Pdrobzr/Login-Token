const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuariosModel = require('../models/usuariosModel');
require('dotenv').config();

const secret = process.env.SECRET;

const listarUsuarios = async (req, res) => {
    const query = await usuariosModel.listarUsuarios();
    if (query.length > 0) {
        res.json(query);
    } else {
        res.json({ message: 'Não existem usuários cadastrados!' });
    }
}

const autenticarUsuario = async (req, res) => {
    const { email, senha } = req.body;
    const autenticarUsuario = await usuariosModel.autenticarUsuario(email, senha);
    if (autenticarUsuario.length == 1) {
        const senhaHash = autenticarUsuario[0].cd_senha;
        if (bcrypt.compareSync(senha, senhaHash)) {
            const id = autenticarUsuario[0].id_usuario;
            const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
            res.json({ message: 'Logado com sucesso!', token, id});
        } else {
            res.status(400).json();
        }
    } else {
        res.status(400).json();
    }
}

const registrarUsuario = async (req, res) => {
    const {nome, email, senha} = req.body;
    const salt = 10;
    const senhaSegura = await bcrypt.hash(senha, salt);

    const registrarUsuario = await usuariosModel.registrarUsuario(nome, email, senhaSegura);
    if(registrarUsuario === true){
        res.json({message: 'Usuário cadastrado com sucesso!'});
    } else {
        res.status(400).json();
    }
}

const deletarUsuario = async (req, res) => {
    const { id } = req.params;
    const deletarUsuario = await usuariosModel.deletarUsuario(id);
    if(deletarUsuario === true){
        res.json({message: 'Usuário deletado com sucesso!'});
    } else {
        res.status(400).json();
    }
}

const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const {nome, email} = req.body;
    const editarUsuario = await usuariosModel.editarUsuario(id, nome, email);
    if(editarUsuario === true){
        res.json({message: 'Informações editadas com sucesso!'});
    } else {
        res.status(400).json();
    }

}

const selecionarUsuario = async (req, res) => {
    const { id } = req.params;
    const selecionarUsuario = await usuariosModel.selecionarUsuario(id);
    const nome = selecionarUsuario[0].nm_usuario;
    const email = selecionarUsuario[0].nm_email;
    res.json({nome: nome, email: email});
}

module.exports = {
    listarUsuarios,
    registrarUsuario,
    autenticarUsuario,
    deletarUsuario,
    editarUsuario,
    selecionarUsuario
};