let topSpace = document.querySelector(".top-space");
const moveCount = document.querySelector('#moves');
const resetBtn = document.querySelector('button');
const timer = document.querySelector('.timer');
let topSpaceFilled = false; //variavel de checagem do espaço de cima, inicia em false (espaco vazio)
let itsStarting = true;
let selectedDisk = undefined;

// adiciona listener pra cada torre
document.querySelectorAll(".tower").forEach(item => {
    item.addEventListener("click", event => {
        selectedDisk = item.firstElementChild; // seleciona o primeiro disco da torre e joga na variavel selectedDisk
        let tower = item; // joga o item/torre clicada na variavel tower
        moveDisk(tower, selectedDisk); // chama a funcao de mover o disco passando a torre clicada e o primeiro disco dela
    });
    
});
const timerCount = () => {
    timer.textContent++;
}

const moveDisk = (tower, disk) => {
    // checa se o espaco de cima ja esta ocupado, se estiver tira o disco dele, joga pra torre clicada e vira a variavel de checagem
    if (itsStarting){
        startingTimer = window.setInterval(timerCount, 1000); // tem que ser global pra zerar no reset!!!
        itsStarting = false;
    }
    
    if(topSpaceFilled) {  
        disk = topSpace.lastChild;
        if (validateMove(disk, selectedDisk)) {
            return;
        }
        tower.prepend(disk);  //o "prepend" joga o disco certinho em cima do outro. Com appendChild o disco estava entrando por baixo
        topSpaceFilled = false;
        moveCount.textContent++; // aumenta contador +1;
        return;
    
    }

    // se espaco estiver vazio, joga o primeiro disco da torre clicada nele
    topSpace.append(disk);
    topSpaceFilled = true;
    
}

// to do: 
// comparar tamanhos
const validateMove = (top, fit) => { //verifica os tamanhos e retorna falso para não entrar no if, se for true o if encerra ação
    if (fit == null){
        return false;
    }
    return top.clientWidth > fit.clientWidth;
}
// contar movimentos
// entre outros...
const resetAll = () => {
    moveCount.textContent = 0;
    timer.textContent = 0;
    window.clearInterval(startingTimer);
    topSpaceFilled = false;
    itsStarting = true;
    let disk1 = document.querySelector('.disk1');
    let disk2 = document.querySelector('.disk2');
    let disk3 = document.querySelector('.disk3');
    let disk4 = document.querySelector('.disk4');
    document.querySelector('.left-tower').appendChild(disk1);
    document.querySelector('.left-tower').appendChild(disk2);
    document.querySelector('.left-tower').appendChild(disk3);
    document.querySelector('.left-tower').appendChild(disk4);
}
resetBtn.addEventListener('click', () => {
    resetAll();
})



