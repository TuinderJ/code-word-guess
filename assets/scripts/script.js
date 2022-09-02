let countdownTimer = '';
let wins;
let losses;
let words = ['Program', 'Function', 'Project', 'Application', 'Code', 'Array', 'Variable', 'Loop', 'Object', 'Method', 'Algorithm', 'Argument', 'Computer', 'Statement', 'JavaScript'];
let correctWord;
const word = document.getElementById('word');

// Check for wins and losses stored. If they're not, set them to 0
if (localStorage.getItem('wins') === null) {wins = 0;} else {wins = localStorage.getItem('wins');}
if (localStorage.getItem('losses') === null) {losses = 0;} else {losses = localStorage.getItem('losses');}

document.addEventListener('keydown', e => {
  if (countdownTimer === '') {return}
  let solvedLetters = 0;
  for (let i = 0; i < word.children.length; i++) {
    if (e.key.toUpperCase() === correctWord[i].toUpperCase()) {
      word.children[i].classList.add('solved');
      word.children[i].textContent = correctWord[i];
    }
    if (word.children[i].classList.contains('solved'))  {solvedLetters++;}
  }
  if (solvedLetters === word.children.length) {
    clearInterval(countdownTimer);
    countdownTimer = '';
    wins++;
    localStorage.setItem('wins', wins);
    setScores();
    setTimeout(() => {word.innerHTML = 'You\'ve Won!!!';}, 500);
  }
})

function setScores() {
  document.querySelector('#wins').setAttribute('data-counter', wins);
  document.querySelector('#losses').setAttribute('data-counter', losses);
}

function resetScores() {
  if (countdownTimer !== '') {return}
  localStorage.clear();
  wins = 0;
  losses = 0;
  setScores();
}

function countdown() {
  const timeRemaining = document.getElementById('time-remaining');
  let timer = 30;
  timeRemaining.innerText = timer;
  countdownTimer = setInterval(() => {
    timer--;
    timeRemaining.innerText = timer;
    if (timer === 0) {
      clearInterval(countdownTimer);
      countdownTimer = '';
      losses++;
      localStorage.setItem('losses', losses)
      document.querySelector('#losses').setAttribute('data-counter', losses);
      word.innerHTML = 'You\'ve lost!';
    }
  }, 1000);
}

function play() {
  if (countdownTimer !== '') {return}
  word.innerHTML = '';
  const letter = document.createElement('div');
  correctWord = words[Math.floor(Math.random() * words.length)];
  letter.textContent = '_';
  for (let i = 0; i < correctWord.length; i++) {word.append(letter.cloneNode(true));}
  countdown();
}

setScores();