function createFood() {
  var x = random(width);
  var y = random(height);
  food.push(createVector(x, y));
}

function createPoison() {
  var x = random(width);
  var y = random(height);
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