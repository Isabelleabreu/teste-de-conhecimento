/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de doce 
 * Projeto: Doceria Gourmet IANES
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express');
const router = express.Router();


const doceController = require('../controller/doce_controller');

router.get('/doces', async function (request, response) {
    let result = await doceController.listarDoces();

    response.status(result.status_code);
    response.json(result);
});

router.get('/doces/:id', async function (request, response) {
    let id = request.params.id;

    let result = await doceController.listarDoceID(id);

    response.status(result.status_code);
    response.json(result);
});

router.post('/doces', async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let result = await doceController.criarDoce(dadosBody, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.put('/doces/:id', async function (request, response) {
    let id = request.params.id;
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let result = await doceController.atualizarDoce(dadosBody, contentType, id);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/doces/:id', async function (request, response) {
    let id = request.params.id;

    let result = await doceController.deletarDoce(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;