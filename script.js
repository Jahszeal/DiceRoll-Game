"use strict";
const player1Score = document.querySelector("#score--0");
const player2Score = document.querySelector("#score--1");
const diceRoll = document.querySelector(".btn--roll");
const diceCube = document.querySelector(".dice");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const btnHold = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");

let currentScore, activePlayer, scores, playGame;

const start = function () {
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  diceCube.classList.add("hidden");
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playGame = true;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("activePlayer");
  player1.classList.remove("activePlayer");
};

start();

const playerSwitch = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

diceRoll.addEventListener("click", function () {
  diceCube.classList.remove("hidden");
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceCube.src = `dice-${dice}.png`;

  if (playGame) {
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      playerSwitch();
    }
  }
});

btnHold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (playGame) {
    if (scores[activePlayer] >= 100) {
      playGame = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    } else {
      playerSwitch();
    }
  }
});

newGame.addEventListener("click", start);
