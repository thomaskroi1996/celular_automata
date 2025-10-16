// Array to store the state of each cell.
let cells = [];
// Rule value
let ruleValue = 90;
// The ruleset string
let ruleSet;
// Width of each cell in pixels
let w = 1;
// y-position
let y = 0;

function setup() {
    createCanvas(800, 800);

    // Convert the rule value to a binary string.
    ruleSet = ruleValue.toString(2).padStart(8, "0");
  
    // Calculate the total number of cells based on canvas width.
    let total = width / w;
    // Initialize all cells to state 0 (inactive).
    for (let i = 0; i < total; i++) {
      cells[i] = floor(random(2));
    }
    // Set the middle cell to state 1 (active) as the initial condition.
    cells[floor(total / 2)] = 1;
    background(255);
}
  
function draw() {
    for (let i = 0; i < cells.length; i++) {
        let x = i * w;
        noStroke();
        fill(255 - cells[i] * 255);
        square(x, y, w);
      }
    
      // Move to the next row.

    let nextCells = [];

    let len = cells.length;

    for (let i=0; i < len; i++){
        let left = cells[(i - 1 + len) % len];
        let right = cells[(i + 1) % len];
        let state = cells[i];
        let newState = calculateState(left, state, right);
        nextCells[i] = newState;
    }

    cells = nextCells;

    y == 800 ? y = 0 : y += w;
}

function calculateState(a,b,c){
    // Create a string representing the state of the cell and its neighbors.
    let neighborhood = "" + a + b + c;
    // Convert the string to a binary number
    let value = 7 - parseInt(neighborhood, 2);
    // Return the new state based on the ruleset.
    return parseInt(ruleSet[value]);
}