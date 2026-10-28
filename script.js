const STAR = "⭐";
const ROCKET = "🚀";
const SPACE = "🌌";
let win = false;

const TITLE = "COLLECT THE STARS!!!";
const WIN_TITLE = "YOU WON!!!";

let steps = 0;
let steps_text = `${steps} steps`;
const WIN_SCORE = 5;
let score = 0;
let high_score = null;

const SPACE_LENGTH = 10;
let rocketPosition = 1;
let starPosition = getStarPos();

let title = document.getElementById("title");
let spaceString = document.getElementById("space_div");
let score_div = document.getElementById("score");
let steps_div = document.getElementById("steps");
let high_score_div = document.getElementById("high_score");

function refreshStars() {
  spaceString.textContent = "";
  for (let i = 1; i <= SPACE_LENGTH; i++) {
    // console.log(`i: ${i}; rocketPos : ${rocketPosition}`);
    if (i == rocketPosition) {
      //   console.log("rocket");
      spaceString.textContent += ROCKET;
    } else if (i == starPosition) {
      //   console.log("star");
      spaceString.textContent += STAR;
    } else {
      //   console.log("space");
      spaceString.textContent += SPACE;
    }
    // console.log(spaceString.textContent);
  }
}

function restart() {
  win = false;
  steps = 0;
  score = 0;
  rocketPosition = 1;
  refreshStars();
  updateSteps(0);
  updateScore(0);
  title.textContent = TITLE;
}

function moveRocket(arg) {
  if (win) {
    return;
  }
  if (rocketPosition == 1 && arg == -1) {
    rocketPosition = SPACE_LENGTH;
  } else if (rocketPosition == SPACE_LENGTH && arg == 1) {
    rocketPosition = 1;
  } else {
    rocketPosition += arg;
  }
  updateSteps(1);
  checkStar();
  refreshStars();
}

function getStarPos() {
  let starPosition = rocketPosition;
  while (starPosition == rocketPosition) {
    starPosition = Math.floor(Math.random() * 10) + 1;
  }
  return starPosition;
}

function checkStar() {
  if (rocketPosition == starPosition) {
    updateScore(1);
    starPosition = getStarPos();
  }
}

function updateSteps(arg) {
  steps += arg;
  steps_div.textContent = `${steps} steps`;
}

function updateScore(arg) {
  console.log(`score! ${score}`);
  score += arg;
  if (score == 5) {
    winGame();
  }
  score_div.textContent = `${score} / ${WIN_SCORE} ${STAR}`;
}

function updateHighScore() {
  high_score = steps;
  high_score_div.textContent = `High Score: ${high_score} steps`;
}

function winGame() {
  win = true;
  title.textContent = WIN_TITLE;
  if (steps < high_score || high_score == null) {
    updateHighScore();
  }
}

restart();
refreshStars();
