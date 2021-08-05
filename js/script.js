// Global Variables
const STARTING_SIZE = 16;
const STARTING_COLOR = "#f582ae";

let size = STARTING_SIZE;
let color = STARTING_COLOR;
let mode = "color"; // mode is one of ("color", "grayscale", "rainbow")
let colors = ['violet','indigo','blue','green','yellow','orange',
                             'red'] // roygbiv colors

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
    if (mode == "color") {
        this.style.backgroundColor = color;
    } else if (mode == "rainbow") {
        this.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    } else if (mode == "grayscale") {
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1)); // get alpha value of color

        if (currentOpacity < 1) {
            this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
            console.log(this.style.backgroundColor);
        } else if (currentOpacity > 1 && this.style.backgroundColor != `rgba(0, 0, 0, 1)`) {
            this.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
        }
    } else if (mode == "eraser") {
        this.style.backgroundColor = "#fef6e4";
    }
}

function resetGrid() {
    grid.innerHTML = "";
    createGrid(size);
}

function changeGridSize() {
    // size = slider.value;
    resetGrid();
    createGrid(size);
}

function updateGridSizeText() {
    size = slider.value;
    gridSize.textContent = `${size} x ${size}`;
}
function setColor() {
    color = this.value;
}

function setMode(currentMode) {
    // Remove active style from previousMode
    if (mode == "color") {
        colorButton.classList.remove("active");
    } else if (mode=="grayscale") {
        grayscaleButton.classList.remove("active");
    }else if (mode == "rainbow") {
        rainbowButton.classList.remove("active");
    } else if(mode == "eraser") {
        eraserButton.classList.remove("active");
    }

    mode = currentMode;

    if (mode == "color") {
        colorButton.classList.add("active");
    } else if (mode=="grayscale") {
        grayscaleButton.classList.add("active");
    } else if (mode == "rainbow") {
        rainbowButton.classList.add("active");
    } else if(mode == "eraser") {
        eraserButton.classList.add("active");
    }
}

const grid = document.getElementById('grid');
const cells = grid.childNodes;
const clearButton = document.getElementById("clear");
const gridSize = document.getElementById("grid-size");
const slider = document.getElementById("slider");
const colorInput = document.getElementById("color-picker");
const colorButton = document.getElementById("color-button");
const grayscaleButton = document.getElementById("grayscale-button");
const rainbowButton = document.getElementById("rainbow-button");
const eraserButton = document.getElementById("eraser-button");

clearButton.addEventListener("click", resetGrid);
slider.addEventListener('input', updateGridSizeText);
slider.addEventListener('change', changeGridSize);
colorInput.addEventListener('input', setColor);
colorButton.classList.add("active");

colorButton.onclick = () => setMode('color');
grayscaleButton.onclick = () => setMode('grayscale');
rainbowButton.onclick = () => setMode('rainbow');
eraserButton.onclick = () => setMode('eraser');


createGrid(size);
