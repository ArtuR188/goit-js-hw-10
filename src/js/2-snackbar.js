import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const delay = Number(form.delay.value);
  const state = form.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === "fulfilled" ? resolve(delay) : reject(delay);
    }, delay);
  });

  promise.then(d => {
    iziToast.success({
      message: `Fulfilled promise in ${d}ms`,
      position: "topRight"
    });
  });

  promise.catch(d => {
    iziToast.error({
      message: `Rejected promise in ${d}ms`,
      position: "topRight"
    });
  });

  form.reset();
});
