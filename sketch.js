const dimension = document.getElementById("dim")
const colorScheme = document.getElementById("colorScheme");
const colorSubmitButton = document.getElementById("colorSubmitButton");

dimension.addEventListener("change", (e) => {
    console.log(e.target.value)
});


let cells = [];
let ruleValue = 90;
let ruleSet;
let y;
let w;
let continueDrawing;
let colorFormula = 0;

function initialise(){
    ruleSet = ruleValue.toString(2).padStart(8, "0");

    let total = width / w;
    for (let i = 0; i < total; i++) {
      cells[i] = floor(random(2));
    }
    y = 100;
    w = 5;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);

    initialise();
    
    colorSubmitButton.addEventListener("click", (e) => {
        let colorFormula = colorScheme.value;
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
    } 

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

function calculateState(a,b,c){
    let neighborhood = "" + a + b + c;
    let value = 7 - parseInt(neighborhood, 2);
    return parseInt(ruleSet[value]);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }