const jwt = require('jsonwebtoken');

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

module.exports = verifyToken;