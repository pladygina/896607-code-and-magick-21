'use strict';

(function () {
  let number = 100;
  const DEBOUNCE_INTERVAL = 500; // ms

  window.utils = {
    isEscEvent: (evt, action) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent: (evt, action) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        action();
      }
    },
    getRandomFromArray: (array) => {
      return array[Math.floor(Math.random() * array.length)];
    },
    errorHandler: (errorMessage) => {
      let node = document.createElement(`div`);
      let style = `z-index: ` + number + `; margin: 0 auto; text-align: center; background-color: #da641a;`;
      node.style = style;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;
      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
      number++;
    },
    debounce: (cb) => {
      let lastTimeout = null;

      return function () {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
