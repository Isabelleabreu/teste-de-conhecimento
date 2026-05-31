/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação da camada model de descartes (Controller)
 * Projeto: Doceria Gourmet IANES
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 *******************************************************************************************/

const descarteDAO = require('../model/DAO/descarteDAO');
const messages = require('../modulo/config_messages.js');

//GET - listar descartes
const listarDescartes = async function () {
    try {
        let result = await descarteDAO.getselectAllDescartes();

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

//GET - listar descarte por ID
const listarDescarteID = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let result = await descarteDAO.getselectDescarteById(id);

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

//POST - criar descarte
const criarDescarte = async function (descarte, contentType) {
    try {
        if (String(contentType).toLowerCase() != 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        if (
            descarte.motivo == '' || descarte.motivo == undefined ||
            descarte.data_descarte == '' || descarte.data_descarte == undefined ||
            descarte.fk_doce_id == '' || descarte.fk_doce_id == undefined || isNaN(descarte.fk_doce_id) ||
            descarte.fk_usuario_id == '' || descarte.fk_usuario_id == undefined || isNaN(descarte.fk_usuario_id)
        ) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        let result = await descarteDAO.setInsertDescarte(descarte);

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            responseData.status = messages.SUCCESS_CREATED_ITEM.status;
            responseData.status_code = messages.SUCCESS_CREATED_ITEM.status_code;
            responseData.id = result;

            return responseData;
        } else {
            return messages.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

//PUT - atualizar descarte
const atualizarDescarte = async function (descarte, contentType, id) {
    try {
        if (id == '' || id == undefined || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        if (String(contentType).toLowerCase() != 'application/json') {
            return messages.ERROR_CONTENT_TYPE;
        }

        let buscarID = await descarteDAO.getselectDescarteById(id);

        if (buscarID) {
            if (
                descarte.motivo == '' || descarte.motivo == undefined ||
                descarte.data_descarte == '' || descarte.data_descarte == undefined ||
                descarte.fk_doce_id == '' || descarte.fk_doce_id == undefined || isNaN(descarte.fk_doce_id) ||
                descarte.fk_usuario_id == '' || descarte.fk_usuario_id == undefined || isNaN(descarte.fk_usuario_id)
            ) {
                return messages.ERROR_REQUIRED_FIELDS;
            }

            descarte.id = id;

            let result = await descarteDAO.setUpdateDescarte(descarte);

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

//DELETE - deletar descarte
const deletarDescarte = async function (id) {
        if (id == '' || id == undefined || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS;
        }

        try {
            let buscarID = await descarteDAO.getselectDescarteById(id);

            if (buscarID) {
                let result = await descarteDAO.setDeleteDescarte(id);

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
    listarDescartes,
    listarDescarteID,
    criarDescarte,
    atualizarDescarte,
    deletarDescarte
};

