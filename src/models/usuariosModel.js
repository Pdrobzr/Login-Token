const connect = require('./connect');

const listarUsuarios = async () => {
    const [query] = await connect.execute("SELECT * FROM usuarios");
    return query;
}

const registrarUsuario = async (nome, email, senha) => {
    const query = "SELECT * FROM usuarios WHERE nm_email = ?";
    const [verify] = await connect.execute(query, [email]);
    if (verify.length > 0) {
        return false;
    } else {
        const insert = "INSERT INTO usuarios(nm_usuario, nm_email, cd_senha) VALUES (?, ?, ?)";
        const [execute] = await connect.execute(insert, [nome, email, senha]);
        return true;
    }
}

const autenticarUsuario = async (email) => {
    const [execute] = await connect.execute("SELECT * FROM usuarios WHERE nm_email = ?", [email]);
    return execute;
}

const deletarUsuario = async (id) => { 
    const query = "DELETE FROM usuarios WHERE id_usuario = ?";
    const [execute] = await connect.execute(query, [id]);
    if(execute.affectedRows > 0){
        return true;
    } else {
        return false;
    }
}

const editarUsuario = async (id, nome, email) => {
    const query = "UPDATE usuarios SET nm_usuario = ?, nm_email = ? WHERE id_usuario = ?";
    const [execute] = await connect.execute(query, [nome, email, id]);
    if(execute.affectedRows > 0){
        return true;
    } else {
        return false;
    }
}

const selecionarUsuario = async (id) => {
    const query = "SELECT * FROM usuarios WHERE id_usuario = ?";
    const [execute] = await connect.execute(query, [id]);
    return execute;
}

module.exports = {
    listarUsuarios,
    registrarUsuario,
    autenticarUsuario,
    deletarUsuario,
    editarUsuario,
    selecionarUsuario
}