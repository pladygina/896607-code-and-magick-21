'use strict';

(function () {
  const Url = {
    LOAD: `https://21.javascript.pages.academy/code-and-magick/data`,
    UPLOAD: `https://21.javascript.pages.academy/code-and-magick`
  };
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  window.backend = {
    load: (onLoad, onError) => {
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      });
      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, function () {
        onError(`Похожие волшебники не успели загрузиться с сервера за  ` + xhr.timeout + ` мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;
      xhr.open(`GET`, Url.LOAD);
      xhr.send();
    },
    save: (data, onLoad, onError) => {
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      });
      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка загрузки`);
      });
      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос на сохранение не успел выполниться за ` + xhr.timeout + ` мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;
      xhr.open(`POST`, Url.UPLOAD);
      xhr.send(data);
    }
  };
})();
