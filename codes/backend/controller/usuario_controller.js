/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação da camada model de usuario (Controller)
 * Projeto: Doceria Gourmet IANES
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 *******************************************************************************************/

const usuarioDAO = require('../model/DAO/usuarioDAO');
const messages = require('../modulo/config_messages');

const loginUsuario = async function (usuario) {

    try {

    if (
        usuario.email == '' || usuario.email == undefined ||
        usuario.senha == '' || usuario.senha == undefined
    ) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    let result = await usuarioDAO.loginUsuario(usuario.email, usuario.senha);

    if (result && result.length > 0) {
        
        let responseData = Object.assign({}, messages.HEADER);
        
        responseData.status = messages.SUCCESS_REQUEST.status;
        responseData.status_code = messages.SUCCESS_REQUEST.status_code;
        responseData.message = 'Login realizado com sucesso.';
        responseData.response = result[0];

        return responseData;
    } else {
        return messages.ERROR_NOT_FOUND;
    }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }

};

const listarUsuarios = async function () {
    try {
        let result = await usuarioDAO.getSelectAllUsers();

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);
            
            responseData.status = messages.SUCCESS_REQUEST.status;
            responseData.status_code = messages.SUCCESS_REQUEST.status_code;
            responseData.message = 'Usuários listados com sucesso.';
            responseData.response = result;
            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const listarUsuarioID = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try {
        let result = await usuarioDAO.getSelectByIdUser(id);

        if (result) {
            let responseData = Object.assign({}, messages.HEADER);

            responseData.status = messages.SUCCESS_REQUEST.status;
            responseData.status_code = messages.SUCCESS_REQUEST.status_code;
            responseData.message = 'Usuário listado com sucesso.';
            responseData.response = result[0];
            return responseData;
        } else {
            return messages.ERROR_NOT_FOUND;
        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

module.exports = {
    loginUsuario,
    listarUsuarios,
    listarUsuarioID
};