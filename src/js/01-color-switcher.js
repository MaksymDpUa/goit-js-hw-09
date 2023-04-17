const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

let intervalId = null;
stopBtn.disabled = true;

function onStart() {
  intervalId = setInterval(changeBkg, 1000);
  isActive = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStop() {
  clearInterval(intervalId);
  isActive = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function changeBkg() {
  body.style.backgroundColor = `${getRandomHexColor()}`;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
