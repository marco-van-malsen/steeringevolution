// Daniel Shiffman
// The Coding Train
// Coding Challenge 69: Steering Evolution
// Part 1: https://youtu.be/flxOkx0yLrY
// Part 2: https://youtu.be/XaOVH8ZSRNA
// Part 3: https://youtu.be/vZUWTlK7D2Q
// Part 4: https://youtu.be/ykOcaInciBI
// Part 5: https://youtu.be/VnFF5V5DS8s

// https://editor.p5js.org/codingtrain/sketches/xgQNXkxx1

class Vehicle {
  constructor(x, y, dna) {
    this.acceleration = createVector(0, 0);
    this.health = 1;
    this.maxforce = 0.5;
    this.maxspeed = 5;
    this.position = createVector(x, y);
    this.r = 4;
    this.velocity = createVector(0, -2);

    var mr = 0.01; // mutation ratio

    this.dna = [];
    if (dna === undefined) {
      this.dna[0] = random(-2, 2); // Food weight
      this.dna[1] = random(-2, 2); // Poison weight
      this.dna[2] = random(0, 100); // Food perception
      this.dna[3] = random(0, 100); // Poison perception

    } else {
      // Mutation
      this.dna[0] = dna[0];
      if (random(1) < mr) {
        this.dna[0] += random(-0.1, 0.1);
      }

      this.dna[1] = dna[1];
      if (random(1) < mr) {
        this.dna[1] += random(-0.1, 0.1);
      }

      this.dna[2] = dna[2];
      if (random(1) < mr) {
        this.dna[2] += random(-10, 10);
      }

      this.dna[3] = dna[3];
      if (random(1) < mr) {
        this.dna[3] += random(-10, 10);
      }
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  behaviors(good, bad) {
    var steerG = this.eat(good, 0.2, this.dna[2]);
    var steerB = this.eat(bad, -1, this.dna[3]);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  boundaries() {
    var desired = null;

    if (this.position.x < boundary) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - boundary) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < boundary) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - boundary) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  cloneMe() {
    return (random(1) < 0.002)
  }

  dead() {
    return (this.health < 0)
  }

  // Draw vehicle
  draw() {
    var angle = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);

    if (debug) {
      noFill();
      strokeWeight(2);

      // draw food attraction and perception radius
      stroke(0, 255, 0, 127);
      line(0, 0, 0, -this.dna[0] * 25);
      ellipse(0, 0, this.dna[2] * 2);

      // draw poison attraction and perception radius
      stroke(255, 0, 0, 127);
      line(0, 0, 0, -this.dna[1] * 25);
      ellipse(0, 0, this.dna[3] * 2);
    }

    // linear interpolation of color between red (health = 0) and green (health = 1)
    var colG = color(0, 255, 0);
    var colR = color(255, 0, 0);
    var col = lerpColor(colR, colG, this.health);

    // draw vehicle
    fill(col);
    stroke(col);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    // draw health
    if (debug) {
      rotate(-angle);
      fill(col);
      stroke(0);
      textAlign(CENTER, TOP);
      textSize(10);
      text(nf(this.health, 1, 3), 0, 10);
    }
    pop();
  }

  eat(list, nutrition, perception) {
    var record = Infinity;
    var closest = null;

    for (var i = list.length - 1; i >= 0; i--) {
      var d = this.position.dist(list[i]);

      if (d < this.maxspeed) {
        list.splice(i, 1);
        this.health += nutrition;
      } else {
        if (d < record && d < perception) {
          record = d;
          closest = list[i];
        }
      }
    }

    if (closest != null) {
      return this.seek(closest);
    }

    return createVector(0, 0);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
  }

  // Method to update location
  update() {
    this.health -= 0.005;
    this.velocity.add(this.acceleration); // Update velocity
    this.velocity.limit(this.maxspeed); // Limit speed
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset accelerationelertion to 0 each cycle
  }
}