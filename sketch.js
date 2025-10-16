let cells = [1, 0, 0, 1 , 1, 1, 0, 0, 1 , 1 ];
let w = 40;

function setup() {
    createCanvas(400, 400);
  }
  
function draw() {
    for (let i = 0; i <= cells.length; i++){
        let x = i * w;
        stroke(0);
        fill(255 - cells[i]*255);
        square(x, 0, w);
    }
}
