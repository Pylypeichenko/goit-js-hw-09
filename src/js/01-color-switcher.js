const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

stopButton.setAttribute('disabled', true);

startButton.addEventListener('click', activateChangingBodyBgColorLoop);
stopButton.addEventListener('click', disactivateChangingBodyBgColorLoop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function activateChangingBodyBgColorLoop() {
  changeBodyBgColor();

  intervalId = setInterval(changeBodyBgColor, 1000);

  stopButton.removeAttribute('disabled');
  startButton.setAttribute('disabled', true);
}

function disactivateChangingBodyBgColorLoop() {
  clearInterval(intervalId);

  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', true);
}
