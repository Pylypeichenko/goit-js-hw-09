// Описан в документации
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysTimerValue = document.querySelector('span[data-days]');
const hoursTimerValue = document.querySelector('span[data-hours]');
const minutesTimerValue = document.querySelector('span[data-minutes]');
const secondsTimerValue = document.querySelector('span[data-seconds]');
const timer = document.querySelector('.timer');
const fields = document.querySelectorAll('.field');

let intervalId = null;
let isActive = false;

timer.classList.add('styles-for-timer');
fields.forEach(field => field.classList.add('styles-for-fields'));

startButton.setAttribute('disabled', 'disabled');
Notiflix.Notify.info('Please, select the date you prefere to set the timer');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDatetime = new Date(selectedDates[0]);
    turnStartButtonOn(selectedDatetime);
  },
};

flatpickr(dateInput, options);

function turnStartButtonOn(data) {
  const selectedDatetime = data.getTime();
  const currentTime = Date.now();
  if (selectedDatetime < currentTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
    Notiflix.Loading.remove(2000);
    return;
  } else {
    startButton.removeAttribute('disabled');
    Notiflix.Notify.success('Now press the button "Start"');
  }

  startButton.addEventListener('click', () => {
    startCountdown(selectedDatetime, currentTime);
    Notiflix.Notify.info('Enjoy your waiting :)');
  });
}

function startCountdown(futureDatetime, currentTime) {
  if (isActive) {
    return;
  }

  isActive = true;
  intervalId = setInterval(() => {
    const currentTime = Date.now();

    const deltaTime = futureDatetime - currentTime;
    if (futureDatetime < currentTime) {
      Notiflix.Notify.success('Your time has come !!!');
      return;
    }
    console.log(convertMs(deltaTime));
    const time = convertMs(deltaTime);
    updateTimerValues(time);

    // { days, hours, minutes, seconds } = convertMs(deltaTime);
  }, 1000);
}

function updateTimerValues({ days, hours, minutes, seconds }) {
  daysTimerValue.textContent = `${days}`;
  hoursTimerValue.textContent = `${hours}`;
  minutesTimerValue.textContent = `${minutes}`;
  secondsTimerValue.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
