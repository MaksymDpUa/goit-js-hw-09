import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';



const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');



startBtn.disabled = true;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
        startBtn.disabled = true;
        Notiflix.Notify.warning('Please choose a date in the future');
    //   alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', onClick);
function onClick() {
  const targetTime = new Date(input.value);

  intervalId = setInterval(() => {
      const restTime = targetTime - Date.now();

      if (restTime <= 0) {
          return
      }

      const timer = convertMs(restTime);
      const { days, hours, minutes, seconds } = timer;

      daysEl.textContent = `${days}`;
      hoursEl.textContent = `${addLeadingZero(hours)}`;
      minutesEl.textContent = `${addLeadingZero(minutes)}`;
      secondsEl.textContent = `${addLeadingZero(seconds)}`;
      
  }, 1000);

//   convertMs(restTme);

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
   return String(value).padStart(2, "0")
};
