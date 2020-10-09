'use strict';

(function () {
  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        action();
      }
    }
  };
})();
