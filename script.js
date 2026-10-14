// ---------- Dados dos projetos ----------
// Para adicionar um projeto novo, basta incluir um objeto nesta lista.

const USUARIO_GITHUB = "HeitorGPiovan";

const PROJETOS = [
  {
    titulo: "Lista de Tarefas",
    descricao: "App de tarefas com filtros, contador e salvamento automático no navegador.",
    tecnologias: ["HTML", "CSS", "JavaScript", "localStorage"],
    repo: "lista-de-tarefas",
  },
  {
    titulo: "Previsão do Tempo",
    descricao: "Consome a API da Open-Meteo para mostrar o clima atual e a previsão de 5 dias de qualquer cidade.",
    tecnologias: ["JavaScript", "API REST", "fetch", "async/await"],
    repo: "app-clima",
  },
  {
    titulo: "Landing Page – Café Orvalho",
    descricao: "Página responsiva de uma cafeteria fictícia, com menu mobile, cardápio em abas e animações ao rolar.",
    tecnologias: ["HTML semântico", "CSS Grid", "Flexbox", "JavaScript"],
    repo: "landing-page-cafeteria",
  },
];

function criarCardProjeto(projeto) {
  const urlRepo = `https://github.com/${USUARIO_GITHUB}/${projeto.repo}`;
  const urlDemo = `https://${USUARIO_GITHUB.toLowerCase()}.github.io/${projeto.repo}/`;

  const card = document.createElement("article");
  card.className = "projeto revelar";
  card.innerHTML = `
    <h3>${projeto.titulo}</h3>
    <p>${projeto.descricao}</p>
    <ul class="tags">${projeto.tecnologias.map((t) => `<li>${t}</li>`).join("")}</ul>
    <div class="projeto__links">
      <a href="${urlDemo}" target="_blank" rel="noopener">Ver online →</a>
      <a href="${urlRepo}" target="_blank" rel="noopener">Código</a>
    </div>`;
  return card;
}

const listaProjetos = document.getElementById("lista-projetos");
PROJETOS.forEach((p) => listaProjetos.appendChild(criarCardProjeto(p)));

// ---------- Efeito de digitação ----------

const palavras = ["front-end", "web", "em formação 🚀"];
const alvo = document.getElementById("digitando");
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduzirMovimento) {
  let indicePalavra = 0;
  let indiceLetra = palavras[0].length;
  let apagando = true;

  function digitar() {
    const palavra = palavras[indicePalavra];
    alvo.textContent = palavra.slice(0, indiceLetra);

    if (apagando) {
      indiceLetra--;
      if (indiceLetra < 0) {
        apagando = false;
        indicePalavra = (indicePalavra + 1) % palavras.length;
        indiceLetra = 0;
      }
    } else {
      indiceLetra++;
      if (indiceLetra > palavras[indicePalavra].length) {
        apagando = true;
        setTimeout(digitar, 1800);
        return;
      }
    }
    setTimeout(digitar, apagando ? 50 : 100);
  }

  setTimeout(digitar, 2000);
}

// ---------- Tema claro/escuro ----------

const botaoTema = document.getElementById("tema-botao");

botaoTema.addEventListener("click", () => {
  const raiz = document.documentElement;
  const novoTema = raiz.dataset.tema === "claro" ? "escuro" : "claro";
  raiz.dataset.tema = novoTema;
  try {
    localStorage.setItem("tema", novoTema);
  } catch {}
});

// ---------- Animação ao rolar ----------

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".revelar").forEach((el) => observador.observe(el));

// ---------- Ano no rodapé ----------

document.getElementById("ano").textContent = new Date().getFullYear();
