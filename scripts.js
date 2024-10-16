const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });
        };

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        };

        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo");
        }
    }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    });
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert("Tag não foi encontrada.");
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console.");
            }
        }
    }
});

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
});

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(dadosProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Dados enviados para o backend:", dadosProjeto);
            resolve({ ok: true }); 
        }, 1000);
    });
}

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault(); 

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    if (!nomeDoProjeto) {
        alert("Por favor, preencha o nome do projeto."); 
        return;
    }

    if (!descricaoDoProjeto) {
        alert("Por favor, preencha a descrição do projeto."); // Alerta se a descrição não estiver preenchida
        return;
    }

    if (tagsProjeto.length === 0) {
        alert("Por favor, adicione pelo menos uma tag."); // Alerta se não houver tags
        return;
    }

    const dadosProjeto = {
        nome: nomeDoProjeto,
        descricao: descricaoDoProjeto,
        tags: tagsProjeto,
    };

    console.log("Dados a serem enviados:", dadosProjeto);

    try {
        const response = await publicarProjeto(dadosProjeto);

        if (response.ok) {
            console.log('Projeto publicado com sucesso!');
            alert('Projeto publicado com sucesso!');
        } else {
            console.error('Erro ao publicar o projeto');
            alert('Erro ao publicar o projeto. Tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro na requisição. Verifique o console para mais detalhes.');
    }
});

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";
})

const inputTagBusca = document.getElementById("tag-busca"); 
const listaProjetos = document.getElementById("lista-projetos"); 

inputTagBusca.addEventListener("input", () => {
    const tagBuscada = inputTagBusca.value.toLowerCase().trim(); 
    const projetos = listaProjetos.querySelectorAll(".projeto");

    projetos.forEach((projeto) => {
        const tagsProjeto = JSON.parse(projeto.getAttribute("data-tags")); 
        const tagsCorrespondem = tagsProjeto.some(tag => tag.toLowerCase().includes(tagBuscada));

        projeto.style.display = tagsBuscadas === "" || tagsCorrespondem ? "list-item" : "none"; 
    });
});