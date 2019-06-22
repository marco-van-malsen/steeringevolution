// Daniel Shiffman
// The Coding Train
// Coding Challenge 69: Steering Evolution
// Part 1: https://youtu.be/flxOkx0yLrY
// Part 2: https://youtu.be/XaOVH8ZSRNA
// Part 3: https://youtu.be/vZUWTlK7D2Q
// Part 4: https://youtu.be/ykOcaInciBI
// Part 5: https://youtu.be/VnFF5V5DS8s

// https://editor.p5js.org/codingtrain/sketches/xgQNXkxx1

var boundary = 25;
var debug = false;
var food = [];
var poison = [];
var vehicles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  initUniverse();
}

function draw() {
  // the universe is a dark, dark place
  background(0);

  // create food and poison at semi-random intervals
  if (random(1) < 0.1) createFood();
  if (random(1) < 0.01) createPoison();

  // draw food
  fill(0, 255, 0);
  noStroke();
  for (let f of food) ellipse(f.x, f.y, 4)

  // draw poison
  fill(255, 0, 0);
  noStroke();
  for (var p of poison) ellipse(p.x, p.y, 4);

  // keep track of healthiest vehicle
  var maxHealthNow = 0;

  // draw and update vehicles
  for (var i = vehicles.length - 1; i >= 0; i--) {
    vehicles[i].boundaries();
    vehicles[i].behaviors(food, poison);
    vehicles[i].update();
    vehicles[i].draw();

    // keep track of healthiest vehicle
    maxHealthNow = max(maxHealthNow, vehicles[i].health);

    // clone vehicle
    if (vehicles[i].cloneMe()) createVehicle();

    // create a piece of food when a vehicle dies 
    if (vehicles[i].dead()) {
      createFood();
      vehicles.splice(i, 1);
    }
  }

  // format text
  fill(255);
  stroke(0);
  textSize(10);

  // show vehicle, food and poison stats in top center of screen
  textAlign(CENTER, TOP);
  text('vehicles: ' + vehicles.length + ', healthiest: ' + nf(maxHealthNow, 1, 2) + ', food: ' + food.length + ', poison: ' + poison.length, width * 0.5, 0);

  // show framerate in upper right corner
  textAlign(RIGHT, TOP);
  text(int(frameRate()) + ' FPS', width, 0);

  // show age of univerise bottom center of screen
  textAlign(CENTER, BOTTOM);
  text('age of universe: ' + nf(millis() / 1000, 1, 2) + 's', width * 0.5, height);

}