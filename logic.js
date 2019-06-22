function createFood() {
  var x = random(boundary, width - boundary);
  var y = random(boundary, height - boundary);
  food.push(createVector(x, y));
}

function createPoison() {
  var x = random(boundary, width - boundary);
  var y = random(boundary, height - boundary);
  poison.push(createVector(x, y));
}

function createVehicle() {
  var x = random(width);
  var y = random(height);
  vehicles.push(new Vehicle(x, y));
}

function keyPressed() {
  if (key === 'D' || key === 'd') debug = !debug;
}

function mousePressed() {
  debug = !debug;
}