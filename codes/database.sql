CREATE DATABASE db_doceria;

USE db_doceria;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
email VARCHAR (100),
senha VARCHAR(255)
);

CREATE TABLE doce (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
validade DATE,
preco DECIMAL(10,2),
quantidade INT,
fk_usuario_id INT,

FOREIGN KEY (fk_usuario_id)
REFERENCES usuario(id)
);

CREATE TABLE descarte (
id INT PRIMARY KEY AUTO_INCREMENT,
data_descarte DATE,
motivo VARCHAR (100),
fk_doce_id INT,
fk_usuario_id INT,

FOREIGN KEY (fk_doce_id)
REFERENCES doce(id),
FOREIGN KEY (fk_usuario_id)
REFERENCES usuario(id)
);

INSERT INTO usuario (
    nome,
    email,
    senha
) VALUES (
    'Administrador',
    'admin@doceria.com',
    '123456'
);

INSERT INTO doce (
    nome,
    validade,
    preco,
    quantidade,
    fk_usuario_id
) VALUES
('Bolo de Morango', '2026-07-10', 45.90, 10, 1),
('Torta de Limão', '2026-07-08', 38.50, 5, 1),
('Brigadeiro Gourmet', '2026-07-05', 3.50, 50, 1);

INSERT INTO descarte (
    data_descarte,
    motivo,
    fk_doce_id,
    fk_usuario_id
) VALUES (
    '2026-05-31',
    'Produto vencido',
    1,
    1
);

