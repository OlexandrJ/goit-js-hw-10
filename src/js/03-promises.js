document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault();

  const delay = Number(this.querySelector('input[name="delay"]').value);
  const step = Number(this.querySelector('input[name="step"]').value);
  const amount = Number(this.querySelector('input[name="amount"]').value);

  if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
    alert('Будь ласка, введіть коректні значення для всіх полів.');
    return;
  }

  const promises = [];

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const currentDelay = delay + (i - 1) * step;

    const promise = createPromise(position, currentDelay);

    promise
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay} ms`);
      });

    promises.push(promise);
  }
});

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