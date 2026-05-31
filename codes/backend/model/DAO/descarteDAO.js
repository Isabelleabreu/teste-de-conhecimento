/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de descarte no Banco de Dados MySQL
 * Projeto: Doceria Gourmet IANES
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 *******************************************************************************************/

// CONEXÃO COM O BANCO DE DADOS
const db = require('../../database/connection.js');

//RETORNA TODOS OS DESCARTES
const getselectAllDescartes = async function () {
    try {
        let sql = `SELECT * FROM descarte;`;
        let result = await db.raw(sql);
       
        return result[0].length > 0 ? result[0] : false;
    } catch (error) {
        return false;
    }
};

//RETORNA DESCARTE PELO ID
const getselectDescarteById = async function (id) {
    try {
        let sql = `SELECT * FROM descarte WHERE id = ${id};`;
        let result = await db.raw(sql);
       
        return result[0].length > 0 ? result[0] : false;
    } catch (error) {
        return false;
    }
};

//INSERE UM NOVO DESCARTE
const setInsertDescarte = async function (descarte) {
    try {
        let sql = `
            INSERT INTO descarte (motivo, data_descarte, fk_usuario_id)
            VALUES ('${descarte.motivo}', '${descarte.data_descarte}', ${descarte.fk_usuario_id});
        `;
        let result = await db.raw(sql);
        return result;
    } catch (error) {
        return false;
    }
};

//ATUALIZA UM DESCARTE
const setUpdateDescarte = async function (descarte) {
    try {
        let sql = `
            UPDATE descarte SET
                motivo = '${descarte.motivo}',
                data_descarte = '${descarte.data_descarte}',
                fk_usuario_id = ${descarte.fk_usuario_id}
            WHERE id = ${descarte.id};
        `;

        let result = await db.raw(sql);

        return result && result[0].affectedRows > 0 ? true : false;
    } catch (error) {
        return false;
    }
};


//DELETA UM DESCARTE
const setDeleteDescarte = async function (id) {
    try {
        let sql = `DELETE FROM descarte WHERE id = ${id};`;
        let result = await db.raw(sql);

        return result && result[0].affectedRows > 0 ? true : false;
    } catch (error) {
        return false;
    }
};

module.exports = {
    getselectAllDescartes,
    getselectDescarteById,
    setInsertDescarte,
    setUpdateDescarte,
    setDeleteDescarte
};