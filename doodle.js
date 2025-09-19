const game = document.getElementById("game");

// Player
const player = document.createElement("div");
player.classList.add("player");
game.appendChild(player);

let playerBottom = 200;
let playerLeft = 185;
let gravity = 2;
let isJumping = false;
let jumpTimer, fallTimer;

// Platforms
let platforms = [];
function createPlatforms() {
  for (let i = 0; i < 5; i++) {
    const platform = document.createElement("div");
    platform.classList.add("platform");
    let platformBottom = i * 120;
    let platformLeft = Math.random() * 320;
    platform.style.left = platformLeft + "px";
    platform.style.bottom = platformBottom + "px";
    game.appendChild(platform);
    platforms.push(platform);
  }
}
createPlatforms();

// Jump
function jump() {
  if (isJumping) return;
  isJumping = true;
  clearInterval(fallTimer);
  jumpTimer = setInterval(() => {
    if (playerBottom >= 550) {
      fall();
    } else {
      playerBottom += 5;
      player.style.bottom = playerBottom + "px";
    }
  }, 20);
}

// Fall
function fall() {
  clearInterval(jumpTimer);
  isJumping = false;
  fallTimer = setInterval(() => {
    if (playerBottom <= 0) {
      clearInterval(fallTimer);
      endGame();
    } else {
      playerBottom -= gravity;
      player.style.bottom = playerBottom + "px";

      // Check collision with platforms
      platforms.forEach(p => {
        const pBottom = parseInt(p.style.bottom);
        const pLeft = parseInt(p.style.left);
        if (
          playerBottom <= pBottom + 15 &&
          playerBottom >= pBottom &&
          playerLeft + 30 > pLeft &&
          playerLeft < pLeft + 85
        ) {
          jump();
        }
      });
    }
  }, 20);
}

// Game Over
function endGame() {
  alert("Game Over!");
  platforms.forEach(p => game.removeChild(p)); // removeChild()
  game.removeChild(player);
  document.removeEventListener("keydown", movePlayer); // removeEventListener()
}

// Controls
function movePlayer(e) {
  if (e.key === "ArrowLeft" && playerLeft > 0) {
    playerLeft -= 20;
    player.style.left = playerLeft + "px";
  }
  if (e.key === "ArrowRight" && playerLeft < 370) {
    playerLeft += 20;
    player.style.left = playerLeft + "px";
  }
  if (e.key === "ArrowUp") {
    jump();
  }
}
document.addEventListener("keydown", movePlayer);

// Start Falling
fall();