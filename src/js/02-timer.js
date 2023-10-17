import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      alert("Please choose a date in the future");
      return;
    }
    const startButton = document.querySelector("[data-start]");
    startButton.disabled = false;
  },
};

const dateTimePicker = document.querySelector("#datetime-picker");
flatpickr(dateTimePicker, options);

const timer = document.querySelector(".timer");
const daysElement = timer.querySelector("[data-days]");
const hoursElement = timer.querySelector("[data-hours]");
const minutesElement = timer.querySelector("[data-minutes]");
const secondsElement = timer.querySelector("[data-seconds]");
let countdownInterval;

function updateTimer(endTime) {
  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = endTime - currentTime;
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateDisplay(0, 0, 0, 0);
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeRemaining);
      updateDisplay(days, hours, minutes, seconds);
    }
  }, 1000);
}

function updateDisplay(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);
  return { days, hours, minutes, seconds };
}

const startButton = document.querySelector("[data-start]");
startButton.addEventListener("click", () => {
  const selectedDate = new Date(dateTimePicker.value);
  if (selectedDate <= new Date()) {
    alert("Please choose a date in the future");
    return;
  }
  startButton.disabled = true;
  updateTimer(selectedDate);
});
