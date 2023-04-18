const formEl = document.querySelector('.form');
const startBtn = document.querySelector('button');

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  let delay = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
     createPromise([i], delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
     delay += step;
  } 
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
       
      } else {
        reject({ position, delay });
       
      }
    }, delay);
  });
}
