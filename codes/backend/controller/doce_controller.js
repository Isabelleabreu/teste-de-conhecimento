/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação da camada model de doces (Controller)
 * Projeto: Doceria Gourmet IANES
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 *******************************************************************************************/

const doceDAO = require('../model/DAO/doceDAO');
const messages = require('../modulo/config_messages.js');

//GET - listar doces
const listarDoces = async function () {
    try {
        let result = await doceDAO.getselectAllDoces();

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_REQUEST.status;
            responseData.status_code = messages.SUCCESS_REQUEST.status_code;
            responseData.response = result;

            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

//GET - listar doce por ID
const listarDoceID = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let result = await doceDAO.getselectDoceById(id);

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_REQUEST.status;
            responseData.status_code = messages.SUCCESS_REQUEST.status_code;
            responseData.response = result[0];

            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

//POST - criar doce
const criarDoce = async function (doce, contentType) {
    try {
        if (String(contentType).toLowerCase() != 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (
            doce.nome == '' || doce.nome == undefined ||
            doce.validade == '' || doce.validade == undefined ||
            doce.preco == '' || doce.preco == undefined ||
            doce.quantidade == '' || doce.quantidade == undefined ||
            doce.fk_usuario_id == '' || doce.fk_usuario_id == undefined
        ) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        let result = await doceDAO.setInsertDoce(doce);

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_CREATED_ITEM.status;
            responseData.status_code = messages.SUCCESS_CREATED_ITEM.status_code;
            responseData.message = messages.SUCCESS_CREATED_ITEM.message;
            responseData.id = result;

            return responseData;
        } else {
            return messages.ERROR_INTERNAL_SERVER_MODEL;
        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

//PUT - atualizar doce
const atualizarDoce = async function(doce, contentType, id) {
    try {
        if (id == '' || id == undefined || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS
        }

        if (String(contentType).toLowerCase() != 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }
        
        let buscarId = await doceDAO.getselectDoceById(id);

        if (buscarId) {
            if (
                doce.nome == '' || doce.nome == undefined ||
                doce.validade == '' || doce.validade == undefined ||
                doce.preco == '' || doce.preco == undefined ||
                doce.quantidade == '' || doce.quantidade == undefined ||
                doce.fk_usuario_id == '' || doce.fk_usuario_id == undefined
            ) {
                return messages.ERROR_REQUIRED_FIELDS;
            }

            doce.id = id;

            let result = await doceDAO.setUpdateDoce(doce);

            if (result) {
                let responseData = Object.assign({}, messages.HEADER);
                responseData.status = messages.SUCCESS_UPDATED_ITEM.status;
                responseData.status_code = messages.SUCCESS_UPDATED_ITEM.status_code;
                responseData.message = messages.SUCCESS_UPDATED_ITEM.message;
                return responseData;
            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

//DELETE - deletar doce
const deletarDoce = async function (id) {
        if (id == '' || id == undefined || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS
        }

        try {
            let buscarId = await doceDAO.getselectDoceById(id);

            if (buscarId) {
                let result = await doceDAO.setDeleteDoce(id);

                if (result) {
                    let responseData = Object.assign({}, messages.HEADER);
                    responseData.status = messages.SUCCESS_DELETE_ITEM.status;
                    responseData.status_code = messages.SUCCESS_DELETE_ITEM.status_code;
                    responseData.message = messages.SUCCESS_DELETE_ITEM.message;
                    return responseData;
                } else {
                    return messages.ERROR_INTERNAL_SERVER_MODEL;
                }
            } else {
                return messages.ERROR_NOT_FOUND;
            }  
        } catch (error) {
            return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
        }
};    

module.exports = {
    listarDoces,
    listarDoceID,
    criarDoce,
    atualizarDoce,
    deletarDoce
};