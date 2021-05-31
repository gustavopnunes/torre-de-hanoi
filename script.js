let topSpace = document.querySelector(".top-space");
let topSpaceFilled = false; //variavel de checagem do espaço de cima, inicia em false (espaco vazio)

// adiciona listener pra cada torre
document.querySelectorAll(".tower").forEach(item => {
    item.addEventListener("click", event => {
        let selectedDisk = item.firstElementChild; // seleciona o primeiro disco da torre e joga na variavel selectedDisk
        let tower = item; // joga o item/torre clicada na variavel tower
        moveDisk(tower, selectedDisk); // chama a funcao de mover o disco passando a torre clicada e o primeiro disco dela
    });
});

const moveDisk = (tower, disk) => {
    // checa se o espaco de cima ja esta ocupado, se estiver tira o disco dele, joga pra torre clicada e vira a variavel de checagem
    if(topSpaceFilled) {  
        disk = topSpace.lastChild;
        disk.style.cssText = 
        "margin-right: 50%; transform: 50%";
        tower.prepend(disk);  //o "prepend" joga o disco certinho em cima do outro. Com appendChild o disco estava entrando por baixo
        topSpaceFilled = false;
    // se espaco estiver vazio, joga o primeiro disco da torre clicada nele
    } else {
        disk.style.cssText =  
        "margin: 0; transform: none;"
        topSpace.append(disk);
        topSpaceFilled = true;
    };
};

// to do: 
// comparar tamanhos
// contar movimentos
// entre outros...


