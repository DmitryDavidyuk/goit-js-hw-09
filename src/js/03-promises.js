import Notiflix from "notiflix";

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('.form [name = "delay"]'),
  step: document.querySelector('.form [name = "step"]'),
  amount: document.querySelector('.form [name = "amount"]'),
}

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  generatePromise()
});

function generatePromise() {
  const allPromise = [];

  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);

  for (let i = 0; i < refs.amount.value; i += 1) {
    allPromise.push(createPromise(i + 1, delay));
    delay += step;
  }
  allPromise.map(promis => {
    promis
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  });
}

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }