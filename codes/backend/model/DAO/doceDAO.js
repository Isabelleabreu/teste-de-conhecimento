/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de doces no Banco de Dados MySQL
 * Projeto: Doceria Gourmet IANES
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 *******************************************************************************************/

// CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection.js');

//RETORNA TODOS OS DOCES
const getselectAllDoces = async function () {
    try {
        let sql = `SELECT * FROM doce;`;
        let result = await db.raw(sql);

        return result[0].length > 0 ? result[0] : false;
    } catch (error) {
        return false;
    }
};

//RETORNA DOCE PELO ID
const getselectDoceById = async function (id) {
    try {
        let sql = `SELECT * FROM doce WHERE id = ${id};`;
        let result = await db.raw(sql);

        return result && result[0].length > 0 ? result[0] : false;
    } catch (error) {
        return false;
    }
};

//INSERE UM NOVO DOCE
const setInsertDoce = async function (doce) {
    try {
        let sql = `
            INSERT INTO doce (nome, validade, preco, quantidade, fk_usuario_id)
            VALUES ('${doce.nome}', '${doce.validade}', ${doce.preco}, ${doce.quantidade}, ${doce.fk_usuario_id});
        `;

        let result = await db.raw(sql);
        return result[0].affectedRows > 0 ? result[0].insertId : false;
    } catch (error) {
        return false;
    }
};

//ATUALIZA UM DOCE
const setUpdateDoce = async function (doce) {
    try {
        let sql = `
            UPDATE doce SET
                nome = '${doce.nome}',
                validade = '${doce.validade}',
                preco = ${doce.preco},
                quantidade = ${doce.quantidade},
                fk_usuario_id = ${doce.fk_usuario_id}
            WHERE id = ${doce.id};
        `;

        let result = await db.raw(sql);

        return result && result[0].affectedRows > 0 ? true : false;
    } catch (error) {
        return false;
    }
};

// DELETA UM DOCE
const setDeleteDoce = async function (id) {
    try {
        let sql = `DELETE FROM doce WHERE id = ${id};`;
        let result = await db.raw(sql);

        return result && result[0].affectedRows > 0 ? true : false;
    } catch (error) {
        return false;
    }
};



module.exports = {
    getselectAllDoces,
    getselectDoceById,
    setInsertDoce,
    setUpdateDoce,
    setDeleteDoce
};