'use strict';
//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');
const player3El = document.querySelector('.player--3');

const score0El = document.querySelector('#score--0'); //DOM element
const score1El = document.getElementById('score--1'); //DOM element
const score2El = document.getElementById('score--2'); //DOM element
const score3El = document.getElementById('score--3'); //DOM element
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const current2El = document.getElementById('current--2');
const current3El = document.getElementById('current--3');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//start Conditions after reloading the page

function init() {
  scores = [0, 0, 0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  score3El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;
  current3El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player3El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player2El.classList.remove('player--active');
  player3El.classList.remove('player--active');
}
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  const playerActive = [player0El, player1El, player2El, player3El];
  // activePlayer = activePlayer === 0 ? 1 : 0; //if the active player is 0, it should be 1 else it should be 0
  if (activePlayer === 3) {
    activePlayer = 0;
  } else {
    activePlayer++;
  }
  playerActive.forEach(function (playerElement, index) {
    if (index === activePlayer) {
      playerElement.classList.add('player--active');
    } else {
      playerElement.classList.remove('player--active');
    }
  });
}
//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);
    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; //change later
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//button hold the score
btnHold.addEventListener('click', function () {
  if (playing) {
    //   console.log('hold');
    //1. add current score to active player's score
    scores[activePlayer] += currentScore; //scores[1]=scores[1]+currentScore
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check score >=100
    if (scores[activePlayer] >= 100) {
      //3. finish the game
      playing = false;
      diceEl.classList.add('hidden');
      // console.log(scores[act ivePlayer]);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //4. switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
