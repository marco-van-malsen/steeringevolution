// create one piece of food at a random location within the boundary
function createFood() {
  var x = random(boundary, width - boundary);
  var y = random(boundary, height - boundary);
  food.push(createVector(x, y));
}

// create one piece of poison at a random location within the boundary
function createPoison() {
  var x = random(boundary, width - boundary);
  var y = random(boundary, height - boundary);
  poison.push(createVector(x, y));
}

// create one vehicle at a random location within the boundary
function createVehicle() {
  var x = random(width);
  var y = random(height);
  vehicles.push(new Vehicle(x, y));
}

// spawn a new universe
function initUniverse() {
  vehicles = [];
  food = [];
  poison = [];
  for (var i = 0; i < 50; i++) createVehicle();
  for (var i = 0; i < 40; i++) createFood();
  for (var i = 0; i < 20; i++) createPoison();
}

// keyboard events
function keyPressed() {
  if (vehicles.length > 0) {
    if (key === 'D' || key === 'd') debug = !debug;
  } else {
    if (key = ' ') {
      debug = false;
      initUniverse();
    }
  }
}

// mouse and touch events
function mousePressed() {
  if (vehicles.length > 0) {
    debug = !debug;
  } else {
    debug = false;
    initUniverse();
  }
}