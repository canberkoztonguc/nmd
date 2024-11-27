function setup() {
  frameRate(60);
  createCanvas(1000, 1000);
  background(190);
}

let position = { x: 0, y: 50 };
let jump = {
  velocityY: 0,
  lift: -15,
  gravity: 0.5,
  maxY: 875,
  jumpCount: 0,
  maxJumps: 100,
  maxFallSpeed: 10,
  acceleration: 0.05,
};

let gameStarted = false;
let gameOver = false;



function ground() {
  strokeWeight(0);
  fill(224, 176, 32);
  rect(0, 900, 1000, 100);
}

function character(x, y) {
  push();
  translate(x, y); // place the character dynamically
  scale(0.3);

  // Body
  push();
  noStroke();
  fill(209, 148, 119);
  rect(350, -10, 30, 20);
  fill(209, 148, 119);
  quad(350, 10, 380, 10, 390, 20, 340, 20);
  fill(209, 148, 119);
  rect(340, 20, 50, 100);
  pop();

  // Jacket
  push();
  fill(220, 50, 60);
  quad(300, 35, 340, 20, 360, 120, 320, 120);
  quad(390, 20, 430, 35, 410, 120, 370, 120);
  pop();

  // Face
  push();
  strokeWeight(0);
  fill(209, 148, 119);
  ellipse(365, -43, 70, 90); // Head
  fill(255);
  ellipse(352, -35, 12, 7); // Left eye
  fill(0);
  ellipse(355, -35, 7, 7);
  fill(255);
  ellipse(378, -35, 12, 7); // Right eye
  fill(0);
  ellipse(375, -35, 7, 7);
  fill(220, 20, 60);
  ellipse(365, -10, 12, 2); // Lip
  pop();

  // Mustache
  fill(0);
  quad(345, -15, 365, -20, 365, -13, 345, -11);
  quad(365, -20, 388, -15, 388, -11, 365, -13);

  // Fes
  push();
  strokeWeight(1);
  fill(220, 20, 60);
  rect(330, -100, 70, 50);
  fill(222, 20, 60);
  ellipse(365, -100, 70, 20); // Top
  strokeWeight(0);
  ellipse(365, -50, 70, 20); // Bottom
  strokeWeight(3);
  fill(0);
  line(365, -100, 340, -93);
  line(340, -93, 340, -60);
  strokeWeight(3);
  line(365, -100, 340, -93);
  line(340, -93, 340, -60);
  pop();

  // Carpet
  push();
  translate(0, 200);
  scale(3);
  noStroke();

  // Left quads
  fill(255, 215, 0);
  quad(70, 0, 85, 0, 75, 8, 60, 8);
  quad(56, 12, 75, 12, 65, 20, 46, 20);
  quad(42, 27, 75, 27, 65, 35, 32, 35);
  quad(25, 42, 75, 42, 65, 50, 15, 50);

  // Right quads
  quad(200, 0, 235, 0, 225, 8, 205, 8);
  quad(180, 12, 221, 12, 211, 20, 180, 20);
  quad(160, 27, 207, 27, 197, 35, 160, 35);
  quad(140, 42, 193, 42, 183, 50, 140, 50);

  // Outer layer
  fill(153, 0, 0);
  quad(80, 0, 220, 0, 170, 50, 30, 50);

  // Middle layer
  fill(255, 215, 0);
  quad(90, 0, 210, 0, 160, 50, 40, 50);

  // Inner layer
  fill(153, 0, 0);
  quad(100, 0, 200, 0, 150, 50, 50, 50);

  // Diamonds
  fill(0, 128, 128);
  quad(115, 3, 125, 9, 110, 16, 100, 9);
  quad(170, 3, 180, 9, 165, 16, 155, 9);
  quad(85, 33, 95, 40, 80, 45, 70, 38);
  quad(145, 33, 155, 40, 140, 45, 130, 38);
  pop();

  // Legs
  fill(220, 50, 60);
  quad(320, 120, 410, 120, 405, 150, 325, 150);
  rect(325, 150, 80, 20);
  fill(21, 23, 22);
  quad(365, 170, 365, 280, 330, 280, 325, 170);
  quad(365, 170, 405, 170, 400, 280, 365, 280);

  pop(); // End character translation
}

function startScreen(x, y, sentence) {
  fill(0);
  rect(x, y, 1000, 200);

  fill(190);
  textSize(100);
  textAlign(CENTER, CENTER);
  text(sentence, x + 500, y + 100);
}

function YOU_DIED(x, y, sentence) {
  fill(0);
  rect(x, y, 1000, 200);

  fill(187, 30, 16);
  textSize(100);
  textAlign(CENTER, CENTER);
  text(sentence, x + 500, y + 100);

  fill(220);
  textSize(30);
  text("Press R to Restart", x + 500, y + 220);
}

function resetGame() {
  position = { x: 0, y: 50 };
  jump = {
    velocityY: 0,
    lift: -15,
    gravity: 0.5,
    maxY: 875,
    jumpCount: 0,
    maxJumps: 100,
    maxFallSpeed: 10,
    acceleration: 0.05,
  };
  gameStarted = false;
  gameOver = false;
}

function draw() {
  background(190);

  if (!gameStarted) {
    startScreen(0, 400, "PRESS W TO START");
  } else if (gameOver) {
    YOU_DIED(0, 400, "YOU FELL");
  } else {
    ground();
    character(position.x, position.y);

    jump.velocityY += jump.gravity;
    if (jump.velocityY < jump.maxFallSpeed) {
      jump.velocityY += jump.acceleration;
    }
    position.y += jump.velocityY;

    if (position.y >= jump.maxY) {
      if (jump.velocityY > jump.maxFallSpeed) {
        gameOver = true;
      } else {
        position.y = jump.maxY;
        jump.velocityY = 0;
        jump.jumpCount = 0;
      }
    }

    if (keyIsDown(65)) {
      position.x -= 5;
    }
    if (keyIsDown(68)) {
      position.x += 5;
    }
  }
}

function keyPressed() {
  if (keyIsDown(32)) {
    if (jump.jumpCount < jump.maxJumps) {
      jump.velocityY = jump.lift + 8; // Acceleration decreases when ten added
      jump.jumpCount++; // Decrease acceleration each time space is pressed
    }
  }

  if (keyIsDown(87) && !gameStarted) {
    gameStarted = true;
  }

  if (keyIsDown(82)) {
    if (gameOver) {
      resetGame(); // Reset if game = gameOver
    }
  }
}
