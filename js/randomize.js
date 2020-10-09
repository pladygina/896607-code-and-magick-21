'use strict';

(function () {
  window.randomize = {
    fromArray: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  };
})();
