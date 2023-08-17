const express = require('express');
const app = express();;
const cors = require('cors');
const router = require('./router');


app.use(express.json());
app.use(cors());
app.use(router);

// const salt = 10;

// const secret = process.env.SECRET;

// require('dotenv').config();

// const PORT = process.env.PORT;

// app.post('/registrar' , async (req, res) => {
//     const {nome, email, senha} = req.body;

//     const senhaSegura = await bcrypt.hash(senha, salt);

//     const query = "INSERT INTO usuarios(nm_usuario, nm_email, cd_senha) VALUES (?, ?, ?)";

//     const [execute] = await connect.execute(query, [nome, email, senhaSegura]);

//     if(execute){
//         res.json({message: 'Usuario cadastrado com sucesso!'});
//     } 

// })

// app.post('/login', async (req, res) => {
//     const {email, senha} = req.body;
//     const [execute] = await connect.execute("SELECT * FROM usuarios WHERE nm_email = ?", [email]);
//     if(execute.length == 1){
//         const senhaHash = execute[0].cd_senha;
//         if(bcrypt.compareSync(senha, senhaHash)){
//             const id = execute[0].id_usuario;
//             const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
//             res.json({message:'Logado com sucesso!', token});
//         } else {
//             res.status(400).json();
//         }
//     } else {
//         res.status(400).json();
//     }

// })

// app.get('/usuarios' , async (req, res) => {
//     const [query] = await connect.execute("SELECT * FROM usuarios");
//     res.json(query);
// })

// app.delete('/usuarios/:id', async (req, res) => {
//     const { id } = req.params;
//     const query = "DELETE FROM usuarios WHERE id_usuario = ?";
//     const [execute] = await connect.execute(query, [id]);
//     if(execute.affectedRows > 0){
//         res.json({message: 'Usuário deletado com sucesso!'});
//     } else {
//         res.status(400).json();
//     }

// })


// const verifyToken = (req, res, next) => {
//     const token = req.header('authorization');
//     if(!token){
//         return res.status(403).json({message: 'Token não fornecido!'});
//     }

//     jwt.verify(token.replace('Bearer ', ''), secret, (err, decoded) => {
//         if(err){
//             return res.status(401).json({message: 'Token inválido!'});
//         }
//         req.user = decoded;
//         next();
//     })
// }

// app.get('/data', verifyToken, (req, res) => {
//     res.json({message: 'Página protegida!'});
// })

module.exports = app;





