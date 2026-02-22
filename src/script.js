// =============================
// SUR MESURE - SISTEMA LIMPO
// =============================

const steps = document.querySelectorAll(".steps button");
const itemsContainer = document.querySelector(".items");
const previewBase = document.getElementById("preview-base");

let currentStep = 0;

let escolha = {
    peca: "",
    tecido: "",
    cor: "",
    detalhes: ""
};

const opcoes = [
    ["Camisa", "Calça", "Blazer", "Vestido", "Saia"],
    ["Algodão Italiano", "Linho Premium", "Lã Fria", "Seda", "Veludo"],
    ["Preto", "Branco", "Azul Marinho", "Cinza", "Bordô"],
    ["Botão Dourado", "Lapela Fina", "Bolso Interno", "Punho Francês"]
];

// =============================
// ETAPAS
// =============================

function atualizarEtapas() {
    steps.forEach(btn => btn.classList.remove("active"));
    steps[currentStep].classList.add("active");
}

function renderItems() {
    itemsContainer.innerHTML = "";

    opcoes[currentStep].forEach(opcao => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerText = opcao;

        div.addEventListener("click", (event) => {
            selecionarItem(opcao, event);
        });

        itemsContainer.appendChild(div);
    });
}

// =============================
// SELECIONAR ITEM
// =============================

function selecionarItem(valor, event) {

    document.querySelectorAll(".item").forEach(item => {
        item.classList.remove("selected");
    });

    event.target.classList.add("selected");

    // Salva escolha
    if (currentStep === 0) {
        escolha.peca = formatarNome(valor);
        atualizarImagemBase();
    }

    if (currentStep === 1) {
        escolha.tecido = valor;
    }

    if (currentStep === 2) {
        escolha.cor = valor;
        atualizarCor();
    }

    if (currentStep === 3) {
        escolha.detalhes = valor;
    }

    // Atualiza resumo em tempo real no desktop
    if (window.innerWidth >= 901) {
        atualizarResumo();
    }

    // Avança etapa
    if (currentStep < 3) {
        currentStep++;
        atualizarEtapas();
        renderItems();
    } else {
        if (window.innerWidth < 901) {
            mostrarResumo();
        }
    }
}

// =============================
// RESUMO MOBILE
// =============================

function mostrarResumo() {
    itemsContainer.innerHTML = `
        <div style="color:white">
            <h3>Resumo do Pedido</h3>
            <p><strong>Peça:</strong> ${escolha.peca}</p>
            <p><strong>Tecido:</strong> ${escolha.tecido}</p>
            <p><strong>Cor:</strong> ${escolha.cor}</p>
            <p><strong>Detalhes:</strong> ${escolha.detalhes}</p>
        </div>
    `;
}

// =============================
// IMAGEM
// =============================

function formatarNome(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
}

function atualizarImagemBase() {
    previewBase.src = `img/${escolha.peca}-branco.png`;
}

function atualizarCor() {

    const mapaCores = {
        "Preto": "preto",
        "Branco": "branco",
        "Azul Marinho": "azulmarinho",
        "Cinza": "cinza",
        "Bordô": "bordo"
    };

    const corArquivo = mapaCores[escolha.cor];

    previewBase.style.opacity = "0";

    setTimeout(() => {
        previewBase.src = `img/${escolha.peca}-${corArquivo}.png`;
        previewBase.style.opacity = "1";
    }, 200);
}

// =============================
// RESUMO DESKTOP
// =============================

function atualizarResumo() {
    document.getElementById("resumo-peca").innerText = escolha.peca || "-";
    document.getElementById("resumo-tecido").innerText = escolha.tecido || "-";
    document.getElementById("resumo-cor").innerText = escolha.cor || "-";
    document.getElementById("resumo-detalhes").innerText = escolha.detalhes || "-";
}

// =============================
// CLICK MANUAL NAS ETAPAS
// =============================

steps.forEach((step, index) => {
    step.addEventListener("click", () => {
        currentStep = index;
        atualizarEtapas();
        renderItems();
    });
});

// =============================
// MODAL
// =============================

function abrirAviso(){
  document.getElementById("modal-aviso").classList.add("ativo");
}

function fecharAviso(){
  document.getElementById("modal-aviso").classList.remove("ativo");
}

// =============================
// INICIALIZA
// =============================

atualizarEtapas();
renderItems();