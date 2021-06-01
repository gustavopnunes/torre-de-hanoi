let topSpace = document.querySelector(".top-space");
const moveCount = document.querySelector('#moves');
let topSpaceFilled = false; //variavel de checagem do espaço de cima, inicia em false (espaco vazio)
let selectedDisk = undefined;

// adiciona listener pra cada torre
document.querySelectorAll(".tower").forEach(item => {
    item.addEventListener("click", event => {
        selectedDisk = item.firstElementChild; // seleciona o primeiro disco da torre e joga na variavel selectedDisk
        let tower = item; // joga o item/torre clicada na variavel tower
        moveDisk(tower, selectedDisk); // chama a funcao de mover o disco passando a torre clicada e o primeiro disco dela
    });
});

const moveDisk = (tower, disk) => {
    // checa se o espaco de cima ja esta ocupado, se estiver tira o disco dele, joga pra torre clicada e vira a variavel de checagem
    
    
    if(topSpaceFilled) {  
        disk = topSpace.lastChild;
        if (validateMove(disk, selectedDisk)) {
            return;
        }
        disk.style.cssText = 
        "margin-right: 50%; transform: 50%";
        tower.prepend(disk);  //o "prepend" joga o disco certinho em cima do outro. Com appendChild o disco estava entrando por baixo
        topSpaceFilled = false;
        moveCount.textContent++; // aumenta contador +1;
        return;
    // se espaco estiver vazio, joga o primeiro disco da torre clicada nele
    } 
    
        disk.style.cssText =  
        "margin: 0; transform: none;"
        topSpace.append(disk);
        topSpaceFilled = true;
    ;
};

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
    
}

