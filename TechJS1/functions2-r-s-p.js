let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

// ✅ ajout du bouton autoplay
document.querySelector('.js-auto')
  .addEventListener('click', () => {
    toggleAutoPlay();
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    toggleAutoPlay();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  if (playerMove === computerMove) {
    result = 'Tie';
    score.ties++;
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    result = 'Win';
    score.wins++;
  } else {
    result = 'Lose';
    score.losses++;
  }

  updateScoreElement();
  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result')
    .innerHTML = `You: ${result}`;

  document.querySelector('.js-moves').innerHTML = `
    You: <img src="images/${playerMove}-emoji.png" class="move-icon">, 
    Computer: <img src="images/${computerMove}-emoji.png" class="move-icon">
  `;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return 'rock';
  } else if (randomNumber < 2 / 3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

function toggleAutoPlay() {
  const button = document.querySelector('.js-auto');

  if (!isAutoPlaying) {
    button.innerText = 'Stop Auto Play';
    isAutoPlaying = true;

    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

  } else {
    button.innerText = 'Auto Play';
    isAutoPlaying = false;
    clearInterval(intervalId);
  }
}
