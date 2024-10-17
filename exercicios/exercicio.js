const emailsRegistrados = ["amandaExemplo@gmail.com", "maisaExemplo@gmail.com"];
const nomesRegistrados = ["usuario1", "usuario2"];
const tagsDisponiveis = ["Front-end", "Programação", "Data-Science", "Full-Stack", "HTML", "CSS", "Java-Script"];

// Utilitários de validação
const validacoes = {
    camposVazios(campos) {
        return campos.some(campo => !campo);
    },

    email(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }
};

// Funções de validação do formulário
function validarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (validacoes.camposVazios([nome, email, senha])) {
        alert("Todos os campos devem ser preenchidos");
        return false;
    }

    if (!validacoes.email(email)) {
        alert("E-mail inválido");
        return false;
    }

    return true;
}

// Funções de verificação
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

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    });
}

// Manipulação de tags
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

function adicionarTag(tagTexto) {
    const tagNova = document.createElement("li");
    tagNova.innerHTML = `
        <p>${tagTexto}</p>
        <img src="./img/close-black.svg" class="remove-tag" alt="Remover tag">
    `;
    listaTags.appendChild(tagNova);
    inputTags.value = "";
}

// Event Listeners
document.getElementById('formCadastro').addEventListener('submit', async (evento) => {
    evento.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!validarFormulario()) return;

    try {
        const [emailExistente, nomeUsuarioExistente] = await Promise.all([
            verificaEmailExistente(email),
            verificaNomeUsuarioExistente(nome)
        ]);

        if (emailExistente) {
            alert("E-mail já está registrado");
            return;
        }
        
        if (nomeUsuarioExistente) {
            alert("Nome de usuário já está registrado");
            return;
        }

        alert("Cadastro realizado com sucesso!");
        evento.target.reset();
    } catch (erro) {
        alert("Erro ao realizar cadastro. Tente novamente.");
    }
});

inputTags?.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();

        if (tagTexto) {
            try {
                const tagPermitida = await verificaTagsDisponiveis(tagTexto);
                if (tagPermitida) {
                    adicionarTag(tagTexto);
                } else {
                    alert("Tag não permitida!");
                }
            } catch (erro) {
                alert("Erro ao adicionar tag. Tente novamente.");
            }
        }
    }
});

listaTags?.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagParaRemover = evento.target.parentElement;
        listaTags.removeChild(tagParaRemover);
    }
});

// Publicação do projeto
async function publicarProjeto(nome, descricao, tags) {
    return new Promise(resolve => {
        setTimeout(() => {
            const sucesso = Math.random() > 0.5;
            alert(sucesso ? "Projeto publicado com sucesso!" : "Falha ao publicar o projeto. Tente novamente.");
            resolve(sucesso);
        }, 2000);
    });
}

const botaoPublicar = document.querySelector(".botao-publicar");

botaoPublicar?.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nomeProjeto")?.value.trim();
    const descricaoDoProjeto = document.getElementById("descricaoProjeto")?.value.trim();
    const tagsProjeto = Array.from(listaTags?.querySelectorAll("p") || [])
        .map(tag => tag.textContent);

    try {
        await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
    } catch (erro) {
        alert("Erro ao publicar projeto. Tente novamente.");
    }
});

// Feedback
async function enviarFeedback(nome, email, mensagem) {
    return new Promise(resolve => {
        setTimeout(() => {
            alert("Feedback enviado com sucesso!");
            resolve(true);
        }, 2000);
    });
}

const botaoEnviarFeedback = document.querySelector(".botao-enviar-feedback");

botaoEnviarFeedback?.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeUsuario = document.getElementById("nomeFeedback")?.value.trim();
    const emailUsuario = document.getElementById("emailFeedback")?.value.trim();
    const mensagemFeedback = document.getElementById("mensagemFeedback")?.value.trim();

    if (validacoes.camposVazios([nomeUsuario, emailUsuario, mensagemFeedback])) {
        alert("Todos os campos de feedback devem ser preenchidos");
        return;
    }

    try {
        await enviarFeedback(nomeUsuario, emailUsuario, mensagemFeedback);
    } catch (erro) {
        alert("Erro ao enviar feedback. Tente novamente.");
    }
});