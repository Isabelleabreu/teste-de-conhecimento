/*******************************************************************************************
 * Objetivo: Arquivo responsável pela realização das rotas de descarte
 * Projeto: Doceria Gourmet IANES
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express');
const router = express.Router();

const descarteController = require('../controller/descarte_controller');

router.get('/descartes', async function (request, response) {
    let result = await descarteController.listarDescartes();
    
    response.status(result.status_code);
    response.json(result);
});

router.get('/descartes/:id', async function (request, response) {
    let id = request.params.id;
    
    let result = await descarteController.listarDescarteID(id);

    response.status(result.status_code);
    response.json(result);
});

router.post('/descartes', async function (request, response) {
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let result = await descarteController.criarDescarte(dadosBody, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.put('/descartes/:id', async function (request, response) {
    let id = request.params.id;
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let result = await descarteController.atualizarDescarte(dadosBody, contentType, id);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/descartes/:id', async function (request, response) {
    let id = request.params.id;

    let result = await descarteController.deletarDescarte(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;