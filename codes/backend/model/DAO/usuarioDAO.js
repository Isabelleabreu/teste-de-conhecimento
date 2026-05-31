/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de usuários no Banco de Dados MySQL
 * Projeto: Doceria Gourmet IANES
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 *******************************************************************************************/

// CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection.js');

// LOGIN DO USUÁRIO
const loginUsuario = async function (email, senha) {
    try {
        let sql = `
            SELECT id, nome, email
            FROM usuario
            WHERE email = '${email}' AND senha = '${senha}';
        `;

        let result = await db.raw(sql);

        if (result && result[0].length > 0) {
            return result[0];
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

// RETORNA TODOS OS USUÁRIOS
const getSelectAllUsers = async function () {
    try {
        let sql = `SELECT id, nome, email FROM usuario;`;
        let result = await db.raw(sql);

        if (result && result[0].length > 0) {
            return result[0];
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

// RETORNA USUÁRIO PELO ID
const getSelectByIdUser = async function (id) {
    try {
        let sql = `SELECT id, nome, email FROM usuario WHERE id = ${id};`;
        let result = await db.raw(sql);

        if (result && result[0].length > 0) {
            return result[0];
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

// INSERE USUÁRIO
const setInsertUser = async function (usuario) {
    try {
        let sql = `
            INSERT INTO usuario (
                nome,
                email,
                senha
            ) VALUES (
                '${usuario.nome}',
                '${usuario.email}',
                '${usuario.senha}'
            );
        `;

        let result = await db.raw(sql);

        if (result && result[0].affectedRows > 0) {
            return result[0].insertId;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

// ATUALIZA USUÁRIO
const setUpdateUser = async function (usuario) {
    try {
        let sql = `
            UPDATE usuario SET
                nome = '${usuario.nome}',
                email = '${usuario.email}',
                senha = '${usuario.senha}'
            WHERE id = ${usuario.id};
        `;

        let result = await db.raw(sql);

        if (result && result[0].affectedRows > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

// DELETA USUÁRIO
const setDeleteUser = async function (id) {
    try {
        let sql = `DELETE FROM usuario WHERE id = ${id};`;
        let result = await db.raw(sql);

        if (result && result[0].affectedRows > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

module.exports = {
    loginUsuario,
    getSelectAllUsers,
    getSelectByIdUser,
    setInsertUser,
    setUpdateUser,
    setDeleteUser
};