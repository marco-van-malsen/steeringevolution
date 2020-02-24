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

  // show vehicle, food and poison stats in upper left corner
  textAlign(LEFT, TOP);
  text('vehicles:\nhealthiest:\nfood:\npoison:\nage:', 0, 0);
  text(vehicles.length + '\n' + nf(maxHealthNow, 1, 2) + '\n' + food.length + '\n' + poison.length + '\n' + nf(millis() / 1000, 1, 2) + 's', 50, 0);

  // show title in top center of screen
  textAlign(CENTER, TOP);
  text('STEERING EVOLUTION', width * 0.5, 0);

  // show framerate in upper right corner
  textAlign(RIGHT, TOP);
  text(int(frameRate()) + ' FPS', width, 0);
}

// responsive UI
function windowResized() {
  // resize canvas
  resizeCanvas(windowWidth, windowHeight);

  // remove invisible food
  for (let i = food.length - 1; i > 0; i--) {
    if (food[i].x < 0 || food[i].x > windowWidth || food[i].y < 0 || food[i].y > windowHeight) food.splice(i);
  }

  // remove invisible poison
  for (let i = poison.length - 1; i > 0; i--) {
    if (poison[i].x < 0 || poison[i].x > windowWidth || poison[i].y < 0 || poison[i].y > windowHeight) poison.splice(i);
  }
}