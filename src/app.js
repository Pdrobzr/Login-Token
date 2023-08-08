const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connect = require('./models/connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

const salt = 10;

const secret = process.env.SECRET;

require('dotenv').config();

const PORT = process.env.PORT;

app.post('/registrar' , async (req, res) => {
    const {nome, email, senha} = req.body;

    const senhaSegura = await bcrypt.hash(senha, salt);

    const query = "INSERT INTO usuarios(nm_usuario, nm_email, cd_senha) VALUES (?, ?, ?)";

    const [execute] = await connect.execute(query, [nome, email, senhaSegura]);

    if(execute){
        res.json({message: 'Usuario cadastrado com sucesso!'});
    } 

})

app.post('/login', async (req, res) => {
    const {email, senha} = req.body;
    const [execute] = await connect.execute("SELECT * FROM usuarios WHERE nm_email = ?", [email]);
    if(execute.length == 1){
        const senhaHash = execute[0].cd_senha;
        if(bcrypt.compareSync(senha, senhaHash)){
            const id = execute[0].id_usuario;
            const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
            res.json({token});
        } else {
            res.status(401).json({message: 'Informações inválidas!'});
        }
    } else {
        res.status(401).json({message: 'Informações inválidas!'});
    }

})


const verifyToken = (req, res, next) => {
    const token = req.header('authorization');
    if(!token){
        return res.status(403).json({message: 'Token não fornecido!'});
    }

    jwt.verify(token.replace('Bearer ', ''), secret, (err, decoded) => {
        if(err){
            return res.status(401).json({message: 'Token inválido!'});
        }
        req.user = decoded;
        next();
    })
}

app.get('/data', verifyToken, (req, res) => {
    res.json({message: 'Página protegida!'});
})


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))

app.use(express.json());
