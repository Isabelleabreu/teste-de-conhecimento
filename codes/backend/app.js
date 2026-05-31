/*******************************************************************************************
 * Objetivo: Arquivo principal da API da Doceria Gourmet IANES
 * Projeto: Doceria Gourmet IANES
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express');
const cors = require('cors');

// Conexão com o banco
const db = require('./database/connection.js');

// Rotas
const usuarioRoutes = require('./routes/usuarioRoutes.js');
const doceRoutes = require('./routes/doceRoutes.js');
const descarteRoutes = require('./routes/descarteRoutes.js');
const app = express();

// Configurações
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/', usuarioRoutes);
app.use('/', doceRoutes);
app.use('/', descarteRoutes);
// Rota principal
app.get('/', (req, res) => {
    res.send('API da Doceria funcionando!');
});

// Inicialização do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});