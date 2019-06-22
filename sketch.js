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
  for (var i = 0; i < 50; i++) createVehicle();
  for (var i = 0; i < 40; i++) createFood();
  for (var i = 0; i < 20; i++) createPoison();
}

function draw() {
  background(0);

  // stop when there are no more vehicles are alive
  if (vehicles.length === 0) noLoop();

  if (random(1) < 0.1) createFood();
  if (random(1) < 0.01) createPoison();

  fill(0, 255, 0);
  noStroke();
  for (let f of food) ellipse(f.x, f.y, 4)

  fill(255, 0, 0);
  noStroke();
  for (var p of poison) ellipse(p.x, p.y, 4);

  var maxHealthNow = 0;
  for (var i = vehicles.length - 1; i >= 0; i--) {
    vehicles[i].boundaries();
    vehicles[i].behaviors(food, poison);
    vehicles[i].update();
    vehicles[i].draw();

    maxHealthNow = max(maxHealthNow, vehicles[i].health);

    if (vehicles[i].cloneMe()) createVehicle();

    if (vehicles[i].dead()) {
      createFood();
      vehicles.splice(i, 1);
    }
  }

  // show framecount(er)
  fill(255);
  stroke(0);
  textSize(10);

  // statistics at top of screen
  textAlign(CENTER, TOP);
  text('vehicles: ' + vehicles.length + ', healthiest: ' + nf(maxHealthNow, 1, 2) + ', food: ' + food.length + ', poison: ' + poison.length, width * 0.5, 0);

  // show framerate in upper right corner
  textAlign(RIGHT, TOP);
  text(int(frameRate()) + ' FPS', width, 0);

  // show age of univerise bottom center of screen
  textAlign(CENTER, BOTTOM);
  text('age of universe: ' + nf(millis() / 1000, 1, 2) + 's', width * 0.5, height);

}