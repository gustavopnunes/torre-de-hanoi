const topSpace = document.querySelector(".top-space");
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




// ----Área de teste
const diskColors = {1: 'aqua', 2: 'rgb(255, 130, 47)', 3: 'red', 4: 'yellow', 5: 'violet', 6: 'darkgreen', 7: 'saddlebrown'}
const getDisksInput = () => {
    return inputDisksQuant.value;
}
const createTowers = () => {
    const towersClass = {0: 'left-tower', 1: 'middle-tower', 2: 'right-tower'};
    
    for (let i = 0; i < 3; i++) {
        const createTower = document.createElement('div');
        createTower.classList.add('tower');
        createTower.classList.add(towersClass[i]);
        towersContainers.appendChild(createTower);
    };
}
const createDisks = (numDisks) => {
    const getInitTower = document.querySelector('.left-tower');
    for (let i = numDisks; i > 0; i--){
        const createDisk = document.createElement('div');
        const basicHeight = 35;
        createDisk.classList.add('disk');
        createDisk.style.cssText = `background-color: ${diskColors[i]};
                                    height: ${basicHeight-numDisks*3}px;
                                    width: ${90-i*10}%;`
        getInitTower.appendChild(createDisk);
    }
}
const timerCount = () => {
    timer.textContent++;
};
const validateMove = (top, fit) => { // verifica os tamanhos e retorna falso para não entrar no if, se for true o if encerra ação
    if (fit == null) {
        return false;
    };
    return top.clientWidth > fit.clientWidth;
}
const weAreTheChampions = () => {
    const showTime = document.querySelector('#finish-time');
    const showMoves = document.querySelector('#finish-moves');
    let getTime = timer.textContent;
    let getMoves = moveCount.textContent;
    showTime.textContent = getTime;
    showMoves.textContent = getMoves;
    showModal.classList.remove('--hidden');
};
const verifyVictory = () => {
    let disksOnGame = getDisksInput();
    const lastTower = document.querySelector('.right-tower');
    if (lastTower.childElementCount === Number(disksOnGame)){
        console.log('2')
        weAreTheChampions();
        window.clearInterval(startingTimer);
    };
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
const createEvents = () => {
    document.querySelectorAll(".tower").forEach(item => {
    item.addEventListener("click", () => {
        selectedDisk = item.firstElementChild; // seleciona o primeiro disco da torre e joga na variavel selectedDisk
        let tower = item; // joga o item/torre clicada na variavel tower
        moveDisk(tower, selectedDisk); // chama a funcao de mover o disco passando a torre clicada e o primeiro disco dela
    });
    
});
}
const gameMaking = () => {
    towersContainers.innerHTML = '';
    createTowers();
    createDisks(getDisksInput());
    createEvents();
}
gameMaking();
// ---fim área de testes




const resetAll = () => {
    moveCount.textContent = 0;
    timer.textContent = 0;
    window.clearInterval(startingTimer);
    topSpaceFilled = false;
    itsStarting = true;
    letBeEquals();
    gameMaking();
    showModal.classList.add('--hidden');
};
resetBtn.addEventListener('click', () => {
    resetAll();
});

retryOnModal.addEventListener('click', () => {
    resetAll();
})
inputDisksQuant.addEventListener('change', () => {
    moveCount.textContent = 0;
    topSpaceFilled = false;
    itsStarting = true;
    letBeEquals();
    gameMaking();
    window.clearInterval(startingTimer);
    timer.textContent = 0;
});