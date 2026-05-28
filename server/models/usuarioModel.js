const db = require("../config/db.js")

module.exports = {
    buscarPorEmail: async (email) => {
        const query = 'SELECT * FROM usuarios WHERE email = ?'
        const [linhas] = await db.execute(query, [email])
        return linhas[0]
    },

    criarUsuario: async (email, senha, perfil) => {
        const query = 'INSERT INTO usuarios (email, senha, perfil) VALUES (?, ?, ?)'
        const [resultado] = await db.execute(query, [email, senha, perfil])
        return resultado.insertId
    },

    criarProfissional: async (nome, telefone, data_de_nascimento, pergunta_rec_senha, resposta_rec_senha, area_de_atuacao, estado, cidade, foto, id_usuario) => {
        const query = `INSERT INTO profissional
            (nome, telefone, data_de_nascimento, pergunta_rec_senha, resposta_rec_senha, area_de_atuacao, estado, cidade, foto, id_usuario)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const [resultado] = await db.execute(query, [nome, telefone, data_de_nascimento, pergunta_rec_senha, resposta_rec_senha, area_de_atuacao, estado, cidade, foto, id_usuario])
        return resultado.insertId
    },

    buscarNomePorIdUsuario: async (id_usuario, perfil) => {
        if (perfil === 'profissional') {
            const [rows] = await db.execute('SELECT nome FROM profissional WHERE id_usuario = ?', [id_usuario])
            return rows[0]?.nome || null
        }
        if (perfil === 'solicitante') {
            const [rows] = await db.execute('SELECT nome FROM solicitante WHERE id_usuario = ?', [id_usuario])
            return rows[0]?.nome || null
        }
        return null
    },

    criarSolicitante: async (nome, telefone, data_de_nascimento, estado, cidade, pergunta_rec_senha, resposta_rec_senha, foto, id_usuario) => {
        const query = `INSERT INTO solicitante
            (nome, telefone, data_de_nascimento, estado, cidade, pergunta_rec_senha, resposta_rec_senha, foto, id_usuario)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const [resultado] = await db.execute(query, [nome, telefone, data_de_nascimento, estado, cidade, pergunta_rec_senha, resposta_rec_senha, foto, id_usuario])
        return resultado.insertId
    }
}
