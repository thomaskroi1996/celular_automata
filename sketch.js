const dimension = document.getElementById("dim")
const colorScheme = document.getElementById("colorScheme");
const colorSubmitButton = document.getElementById("colorSubmitButton");

dimension.addEventListener("change", (e) => {
    console.log(e.target.value)
});


let cells;
let ruleValue = 178;
let ruleSet;
let y;
let w;
let continueDrawing;
let colorFormula = 0;
let mouseRGB = "";
let isClicked = false;

function initialise(){
    cells = [];
    y = 100;
    w = 10;
    isClicked = false;
    mouseRGB = "";
    clear();
    ruleSet = ruleValue.toString(2).padStart(8, "0");

    let total = width / w;
    for (let i = 0; i < total; i++) {
        cells[i] = floor(random(2));
    };
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);

    initialise();
    
    colorSubmitButton.addEventListener("click", (e) => {

        if (isClicked)
            colorFormula = mouseRGB;
        else
            colorFormula = colorScheme.value;

        console.log(colorFormula);
        continueDrawing = true;

        const interval = setInterval(() => {
            draw1D(colorFormula, y);
            y += w;
            if (y >= 1000) {
              clearInterval(interval);
              continueDrawing = false;
            }
        }, 1);
        initialise();
    });
}

function draw1D(colorFormula, y) {
     if (floor(random(50)) == 1){
         ruleValue = floor(random(255));
         ruleSet = ruleValue.toString(2).padStart(8, "0");
    };

    let nextCells = [];
    let previousCells = [];
    let len = cells.length;

    for (let i=0; i < len; i++){
        let left = cells[(i - 1 + len) % len];
        let right = cells[(i + 1) % len];
        let state = cells[i];
        let newState = calculateState(left, state, right);
        nextCells[i] = newState;
    }

    previousCells = [];

    for (let i = 0; i < len; i++) {
        let x = i * w;
        noStroke();
        Function('fill', 'cells', 'nextCells', 'previousCells', 'y', 'i', `fill(${colorFormula});`)(
            fill,
            cells,
            nextCells,
            previousCells,
            y,
            i
        );
        square(x, y, w);
      }

    cells = nextCells;

}

function mousePressed(){
    if (mouseY > 100){
        loadPixels();

        let i = 4 * (floor(mouseY) * width + floor(mouseX));
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let a = pixels[i + 3];

        console.log(`RGB: ${r}, ${g}, ${b} | Alpha: ${a}`);

        isClicked = true;
        mouseRGB = r + "," + g + "," + b;
    }
}

function calculateState(a,b,c){
    let neighborhood = "" + a + b + c;
    let value = 7 - parseInt(neighborhood, 2);
    return parseInt(ruleSet[value]);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }