'use strict';

(function () {
  const WIZADR_COLORS = {
    coats: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
    eyes: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
    fireballs: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]
  };

  let currentColorsNumbers = {
    coats: 0,
    eyes: 0,
    fireballs: 0
  };

  const shiftNumberColors = (colors, number) => {
    return number < (colors.length - 1) ? number + 1 : 0;
  };

  window.colorize = {
    getRandomColor: (item) => {
      return window.utils.getRandomFromArray(WIZADR_COLORS[item]);
    },
    repaintItem: (item, element, input) => {
      element.addEventListener(`click`, function () {
        currentColorsNumbers[item] = shiftNumberColors(WIZADR_COLORS[item], currentColorsNumbers[item]);
        input.value = WIZADR_COLORS[item][currentColorsNumbers[item]];
        if (element.classList.contains(`setup-fireball-wrap`)) {
          element.style.backgroundColor = input.value;
          return;
        }
        element.style.fill = input.value;
      });
    }
  };
})();
