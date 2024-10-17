const emailsRegistrados = ["amandaExemplo@gmail.com", "maisaExemplo@gmail.com"];
const nomesRegistrados = ["usuario1", "usuario2"];
const tagsDisponiveis = ["Front-end", "Programação", "Data-Science", "Full-Stack", "HTML", "CSS", "Java-Script"];

function validarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!nome || !email || !senha) {
        alert("Todos os campos devem ser preenchidos");
        return false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("E-mail inválido");
        return false;
    }

    return true;
}

async function verificaEmailExistente(email) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(emailsRegistrados.includes(email));
        }, 1000);
    });
}

async function verificaNomeUsuarioExistente(nome) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(nomesRegistrados.includes(nome));
        }, 1000);
    });
}

document.getElementById('formCadastro').addEventListener('submit', async (evento) => {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!validarFormulario()) {
        evento.preventDefault();
        return;
    }

    const [emailExistente, nomeUsuarioExistente] = await Promise.all([
        verificaEmailExistente(email),
        verificaNomeUsuarioExistente(nome)
    ]);

    if (emailExistente) {
        alert("E-mail já está registrado");
        evento.preventDefault();
    } else if (nomeUsuarioExistente) {
        alert("Nome de usuário já está registrado");
        evento.preventDefault();
    }
});

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    });
}

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();

        if (tagTexto) {
            const tagPermitida = await verificaTagsDisponiveis(tagTexto);
            if (tagPermitida) {
                adicionarTag(tagTexto);
            } else {
                alert("Tag não permitida!");
            }
        }
    }
});

function adicionarTag(tagTexto) {
    const tagNova = document.createElement("li");
    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
    listaTags.appendChild(tagNova);
    inputTags.value = "";
}

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagParaRemover = evento.target.parentElement;
        listaTags.removeChild(tagParaRemover);
    }
});

const botaoPublicar = document.querySelector(".botao-publicar");

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nomeProjeto").value.trim();
    const descricaoDoProjeto = document.getElementById("descricaoProjeto").value.trim();
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map(tag => tag.textContent);

    await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
});

async function publicarProjeto(nome, descricao, tags) {
    return new Promise(resolve => {
        setTimeout(() => {
            const sucesso = Math.random() > 0.5;
            alert(sucesso ? "Projeto publicado com sucesso!" : "Falha ao publicar o projeto. Tente novamente.");
            resolve();
        }, 2000);
    });
}

const botaoEnviarFeedback = document.querySelector(".botao-enviar-feedback");

botaoEnviarFeedback.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeUsuario = document.getElementById("nomeFeedback").value.trim();
    const emailUsuario = document.getElementById("emailFeedback").value.trim();
    const mensagemFeedback = document.getElementById("mensagemFeedback").value.trim();

    if (!nomeUsuario || !emailUsuario || !mensagemFeedback) {
        alert("Todos os campos de feedback devem ser preenchidos");
        return;
    }

    await enviarFeedback(nomeUsuario, emailUsuario, mensagemFeedback);
});

async function enviarFeedback(nome, email, mensagem) {
    return new Promise(resolve => {
        setTimeout(() => {
            alert("Feedback enviado com sucesso!");
            resolve();
        }, 2000);
    });
}
