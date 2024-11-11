const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let snake;
let direction;
let food;
let score;
let gameSpeed;
let gameInterval;

function initGame(level = "easy") {
  snake = [{ x: boxSize * 5, y: boxSize * 5 }];
  direction = "RIGHT";
  food = {
    x: Math.floor(Math.random() * (canvasWidth / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvasHeight / boxSize)) * boxSize,
  };
  score = 0;
  document.getElementById("score").textContent = `Score: ${score}`;

  if (level === "easy") gameSpeed = 150;
  else if (level === "medium") gameSpeed = 100;
  else if (level === "hard") gameSpeed = 50;
}

function drawBox(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, boxSize, boxSize);
}

function drawSnake() {
  snake.forEach((segment, index) => {
    drawBox(segment.x, segment.y, index === 0 ? "green" : "lime");
  });
}

function drawFood() {
  drawBox(food.x, food.y, "red");
}

function updateSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;
  if (direction === "UP") head.y -= boxSize;
  if (direction === "DOWN") head.y += boxSize;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    document.getElementById("score").textContent = `Score: ${score}`;
    food.x = Math.floor(Math.random() * (canvasWidth / boxSize)) * boxSize;
    food.y = Math.floor(Math.random() * (canvasHeight / boxSize)) * boxSize;
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= canvasWidth ||
    head.y < 0 ||
    head.y >= canvasHeight
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function gameLoop() {
  if (checkCollision()) {
    Swal.fire({
      title: "Game Over!",
      text: `Your score: ${score}`,
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      clearInterval(gameInterval);
      showMenu("mainMenu");
    });
  } else {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawSnake();
    drawFood();
    updateSnake();
  }
}
