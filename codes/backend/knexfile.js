/*******************************************************************************************
 * Objetivo: Arquivo de configuração do DB do projeto
 * Data: 31/05/2026
 * Autor: Isabelle Abreu
 * Versão: 1.0
 ******************************************************************************************/

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host : "127.0.0.1",
            user: "root",
            password: "Ipnr@18#",
            database: "db_doceria",
            port: 3306,
            charset: 'utf8'
        }
    }
};