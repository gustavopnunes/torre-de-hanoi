let topSpace = document.querySelector(".top-space");
let topSpaceFilled = false; //variavel de checagem do espaço de cima, inicia em false (espaco vazio)

// adiciona event listener pra cada torre
document.querySelectorAll(".tower").forEach(item => {
    item.addEventListener("click", event => {
        let selectedDisk = item.firstElementChild; //seleciona o primeiro disco da torre e joga na variavel selectedDisk
        moveDisk(selectedDisk, item); 
    });
});

const moveDisk = (disk, tower) => {
    if (topSpaceFilled) {
        let selectedDisk = topSpace.lastChild;
        selectedDisk.style.cssText = 
        "bottom: 0;"
        tower.append(selectedDisk);
        topSpaceFilled = false;
    } else {
        // se espaco de cima estiver vazio, adiciona selectedDisk nele, aplica uns estilos e vira a variavel de checagem pra true
        disk.style.cssText = 
        "position: absolute; top: 50%; right: 50%; transform: translate(50%, -50%)";
        topSpace.append(disk);
        topSpaceFilled = true;
    };
};


// to do: 
// dar um jeito nas margens
// comparar tamanhos
// entro outros...


