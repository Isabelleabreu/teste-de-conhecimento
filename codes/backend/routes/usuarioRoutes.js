/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de usuários 
 * Projeto: Doceria Gourmet IANES
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuario_controller');

router.post('/login', async (req, res) => {
    let dadosUsuario = req.body;

    let result = await usuarioController.loginUsuario(dadosUsuario);

    res.status(result.status_code);
    res.json(result);
});

router.get('/usuarios', async function (request, response) {
    let result = await usuarioController.listarUsuarios();

    response.status(result.status_code);
    response.json(result);
});

router.get('/usuarios/:id', async function (request, response) {
    let id = request.params.id;

    let result = await usuarioController.listarUsuarioID(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;