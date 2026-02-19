// =============================
// SUR MESURE - SISTEMA CORRIGIDO
// =============================

const steps = document.querySelectorAll(".steps button");
const itemsContainer = document.querySelector(".items");
const preview = document.getElementById("preview-roupa");
const previewBase = document.getElementById("preview-base");
const colorOverlay = document.getElementById("color-overlay");

let currentStep = 0;

let escolha = {
    peca: "",
    tecido: "",
    cor: "",
    detalhes: ""
};

// Opções
const opcoes = [
    ["Camisa", "Calça", "Blazer", "Vestido", "Saia", "Colete"],
    ["Algodão Italiano", "Linho Premium", "Lã Fria", "Seda", "Veludo"],
    ["Preto", "Branco", "Azul Marinho", "Cinza", "Bordô"],
    ["Botão Dourado", "Lapela Fina", "Bolso Interno", "Punho Francês"]
];

// Atualiza botão ativo
function atualizarEtapas() {
    steps.forEach(btn => btn.classList.remove("active"));
    steps[currentStep].classList.add("active");
}

// Renderiza opções
function renderItems() {
    itemsContainer.innerHTML = "";

    opcoes[currentStep].forEach(opcao => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerText = opcao;

        div.addEventListener("click", () => {
            selecionarItem(opcao);
        });

        itemsContainer.appendChild(div);
    });
}

// Selecionar item
function selecionarItem(valor) {

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

    if (currentStep < 3) {
        currentStep++;
        atualizarEtapas();
        renderItems();
    } else {
        mostrarResumo();
    }
}

// Preview peça
function atualizarPreviewPeca(valor) {
    if (!preview) return;

    preview.style.borderRadius = "20px";

    if (valor === "Vestido") {
        preview.style.height = "280px";
        preview.style.borderRadius = "40px 40px 20px 20px";
    } else {
        preview.style.height = "250px";
    }
}

function formatarNome(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
}

function atualizarImagemBase() {
    previewBase.src = `img/${escolha.peca}.png`;
}

function atualizarCor() {

    const filtros = {
        "Preto": "brightness(0.3)",
        "Branco": "brightness(1.2)",
        "Azul Marinho": "sepia(1) hue-rotate(180deg) saturate(5)",
        "Cinza": "grayscale(1)",
        "Bordô": "sepia(1) hue-rotate(320deg) saturate(5)"
    };

    previewBase.style.filter = filtros[escolha.cor];
}


// Preview cor
function atualizarPreviewCor(valor) {
    if (!preview) return;

    const cores = {
        "Preto": "#111",
        "Branco": "#f2f2f2",
        "Azul Marinho": "#1c2a48",
        "Cinza": "#555",
        "Bordô": "#6a1b2e"
    };

    preview.style.background = cores[valor];
}

// Preview detalhe
function atualizarPreviewDetalhe(valor) {
    if (!preview) return;

    if (valor === "Botão Dourado") {
        preview.style.boxShadow = "0 0 25px gold";
    } else {
        preview.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
    }
}

// Resumo final
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

// Permite clicar manualmente nas etapas também
steps.forEach((step, index) => {
    step.addEventListener("click", () => {
        currentStep = index;
        atualizarEtapas();
        renderItems();
    });
});

// Inicializa
atualizarEtapas();
renderItems();
