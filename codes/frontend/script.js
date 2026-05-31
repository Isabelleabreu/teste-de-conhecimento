const loginForm = document.getElementById('login-form');
const doceForm = document.getElementById('doce-form');

const loginSection = document.getElementById('login-section');
const homeSection = document.getElementById('home-section');

const listaDoces = document.getElementById('listaDoces');

const pesquisa = document.getElementById('pesquisa');
const btnAZ = document.getElementById('ordenarAZ');
const btnZA = document.getElementById('ordenarZA');
const btnLogout = document.getElementById('btn-logout');

let doces = [];


// LOGIN

loginForm.addEventListener('submit', async function (event) {

    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                senha
            })
        });

        const data = await response.json();

        if (data.status === true) {

            alert('Login realizado com sucesso!');

            loginSection.style.display = 'none';
            homeSection.style.display = 'block';

            carregarDoces();

        } else {
            alert('E-mail ou senha inválidos!');
        }

    } catch (error) {
        alert('Erro ao conectar com a API.');
        console.log(error);
    }
});


// CARREGAR DOCES

async function carregarDoces() {

    try {

        const response = await fetch('http://localhost:3000/doces');
        const data = await response.json();

        if (data.status) {
            doces = data.response;
            renderizarDoces(doces);
        }

    } catch (error) {
        console.log(error);
    }
}


// RENDERIZAR TABELA

function renderizarDoces(lista) {

    listaDoces.innerHTML = '';

    lista.forEach(doce => {

        let classe = '';

        const hoje = new Date();
        const validade = new Date(doce.validade);

        const diferenca =
            (validade - hoje) / (1000 * 60 * 60 * 24);

        if (diferenca <= 7) {
            classe = 'vencendo';
        }

        listaDoces.innerHTML += `
            <tr class="${classe}">
                <td>${doce.nome}</td>
                <td>R$ ${doce.preco}</td>
                <td>${doce.quantidade}</td>
                <td>${validade.toLocaleDateString()}</td>
            </tr>
        `;
    });
}


// CADASTRAR DOCE

doceForm.addEventListener('submit', async function (event) {

    event.preventDefault();

    const nome = document.getElementById('nomeDoce').value;
    const preco = document.getElementById('precoDoce').value;
    const quantidade = document.getElementById('quantidadeDoce').value;
    const validade = document.getElementById('validadeDoce').value;

    try {

        const response = await fetch('http://localhost:3000/doces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                preco,
                quantidade,
                validade,
                fk_usuario_id: 1
            })
        });

        const data = await response.json();

        if (data.status) {

            alert('Doce cadastrado com sucesso!');

            doceForm.reset();

            carregarDoces();
        }

    } catch (error) {
        console.log(error);
    }
});


// PESQUISA

pesquisa.addEventListener('input', function () {

    const texto = pesquisa.value.toLowerCase();

    const filtrados = doces.filter(doce =>
        doce.nome.toLowerCase().includes(texto)
    );

    renderizarDoces(filtrados);
});


// ORDENAR A-Z

btnAZ.addEventListener('click', function () {

    let lista = [...doces];

    lista.sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );

    renderizarDoces(lista);
});


// ORDENAR Z-A

btnZA.addEventListener('click', function () {

    let lista = [...doces];

    lista.sort((a, b) =>
        b.nome.localeCompare(a.nome)
    );

    renderizarDoces(lista);
});


// LOGOUT

btnLogout.addEventListener('click', function () {

    loginSection.style.display = 'block';
    homeSection.style.display = 'none';

    loginForm.reset();
});