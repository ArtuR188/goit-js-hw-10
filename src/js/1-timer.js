import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("[data-start]");
const input = document.querySelector("#datetime-picker");
startBtn.disabled = true;

let userSelectedDate = null;
let timerId = null;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = selectedDates[0];

    if (date <= new Date()) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight"
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = date;
      startBtn.disabled = false;
    }
  }
});

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const diff = userSelectedDate - new Date();

    if (diff <= 0) {
      clearInterval(timerId);
      updateUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      input.disabled = false;
      return;
    }

    updateUI(convertMs(diff));
  }, 1000);
});

function updateUI({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = addZero(days);
  document.querySelector("[data-hours]").textContent = addZero(hours);
  document.querySelector("[data-minutes]").textContent = addZero(minutes);
  document.querySelector("[data-seconds]").textContent = addZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second)
  };
}

function addZero(value) {
  return String(value).padStart(2, "0");
}
