// Global Variables
const SIZE = 16;

function createGrid(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.addEventListener('mouseover', changeCellColor)
            grid.appendChild(cell);
        }
    }

    gridSize.textContent = `${size} x ${size}`;
}

function changeCellColor() {
    this.style.backgroundColor = "red";
}

function resetGrid() {
    grid.innerHTML = "";
    createGrid(size);
}

function changeGridSize() {
    size = slider.value;
    gridSize.textContent = `${slider.value} x ${slider.value}`;
    resetGrid();
    createGrid(size);
}

const grid = document.getElementById('grid');
const cells = grid.childNodes;
const clearButton = document.getElementById("clear");
const gridSize = document.getElementById("grid-size");
const slider = document.getElementById("slider");

clearButton.addEventListener("click", resetGrid);
slider.addEventListener('input', changeGridSize);



let size = SIZE;
createGrid(size);
