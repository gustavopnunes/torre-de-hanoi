let topSpace = document.querySelector(".top-space");
const moveCount = document.querySelector('#moves');
const resetBtn = document.querySelector('button');
const timer = document.querySelector('.timer');
const showModal = document.querySelector('.victory-modal');
const retryOnModal = document.querySelector('#retry');
const inputDisksQuant = document.querySelector('#disks-quant');
const towersContainers = document.querySelector('.towers');
let topSpaceFilled = false; // variavel de checagem do espaço de cima, inicia em false (espaco vazio)
let itsStarting = true; // variavel checagem inicio timer
let selectedDisk = undefined;

// Ajuste do input range para mostrar sempre o número selecionado
const letBeEquals = () => {
    const valueShown = document.querySelector('#range-show');
    valueShown.textContent = inputDisksQuant.value;
}
inputDisksQuant.addEventListener('mousemove', letBeEquals);


// Criar as torres e discos usando DOM: precisa ficar no topo para os events serem aplicados nos itens criados;
const criaGameDesign = (quant) => {
    const towersClass = {0: 'left-tower', 1: 'middle-tower', 2: 'right-tower'};
    
    for (let i = 0; i < 3; i++) {
        const createTower = document.createElement('div');
        createTower.classList.add('tower');
        createTower.classList.add(towersClass[i]);
        towersContainers.appendChild(createTower);
    };
    for (let i = 1; i <= quant; i++){
        const createDisk = document.createElement('div');
        const towerLeft = document.querySelector('.left-tower');
        createDisk.classList.add("disk", `disk${i}`);
        towerLeft.appendChild(createDisk);
    };
};

//Chama função de criação do jogo:
criaGameDesign();
const disks = document.querySelectorAll(".disk");

// adiciona listener pra cada torre
document.querySelectorAll(".tower").forEach(item => {
    item.addEventListener("click", () => {
        selectedDisk = item.firstElementChild; // seleciona o primeiro disco da torre e joga na variavel selectedDisk
        let tower = item; // joga o item/torre clicada na variavel tower
        moveDisk(tower, selectedDisk); // chama a funcao de mover o disco passando a torre clicada e o primeiro disco dela
    });
    
});

const timerCount = () => {
    timer.textContent++;
};

const moveDisk = (tower, disk) => {
    // checa se o espaco de cima ja esta ocupado, se estiver tira o disco dele, joga pra torre clicada e vira a variavel de checagem
    if (itsStarting){
        startingTimer = window.setInterval(timerCount, 1000); // tem que ser global pra zerar no reset!!!
        itsStarting = false;
    };
    if(topSpaceFilled) {  
        disk = topSpace.lastChild;
        if (validateMove(disk, selectedDisk)) {
            return;
        };
        tower.prepend(disk);  //o "prepend" joga o disco certinho em cima do outro. Com appendChild o disco estava entrando por baixo
        topSpaceFilled = false;
        moveCount.textContent++; // aumenta contador +1;
        //return;
    } else {
        if (disk === null) {
            return;
        };
    // se espaco estiver vazio, joga o primeiro disco da torre clicada nele
    topSpace.append(disk);
    topSpaceFilled = true;
    };
    verifyVictory();
};

// comparar tamanhos
const validateMove = (top, fit) => { // verifica os tamanhos e retorna falso para não entrar no if, se for true o if encerra ação
    if (fit == null) {
        return false;
    };
    return top.clientWidth > fit.clientWidth;
};

//Aplicar o modal da vitoria
const weAreTheChampions = () => {
    const showTime = document.querySelector('#finish-time');
    const showMoves = document.querySelector('#finish-moves');
    let getTime = timer.textContent;
    let getMoves = moveCount.textContent;
    showTime.textContent = getTime;
    showMoves.textContent = getMoves;
    showModal.classList.remove('--hidden');
};

// Verificador de vitória
const verifyVictory = () => {
    const lastTower = document.querySelector('.right-tower');
    if (lastTower.childElementCount === 4){
        weAreTheChampions();
        window.clearInterval(startingTimer);
    };
};

//Reset
const resetAll = () => {
    moveCount.textContent = 0;
    timer.textContent = 0;
    window.clearInterval(startingTimer);
    topSpaceFilled = false;
    itsStarting = true;
    inputDisksQuant.value = 3;
    letBeEquals();
    document.querySelector('.left-tower').append(disks[0], disks[1], disks[2], disks[3]);
    showModal.classList.add('--hidden');
};
resetBtn.addEventListener('click', () => {
    resetAll();
});

retryOnModal.addEventListener('click', () => {
    resetAll();
});