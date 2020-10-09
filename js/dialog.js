'use strict';

(function () {

  const wizardSetup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = wizardSetup.querySelector(`.setup-close`);
  const userNameInput = wizardSetup.querySelector(`.setup-user-name`);
  const dialogHandle = wizardSetup.querySelector(`.upload`);

  const onSetupEscPress = (evt) => {
    window.util.isEscEvent(evt, closeSetup);
  };

  const onOpenSetupEnterPress = (evt) => {
    window.util.isEnterEvent(evt, openSetup);
  };

  const onCloseSetupEnterPress = (evt) => {
    window.util.isEnterEvent(evt, closeSetup);
  };

  const onOpenSetupClick = () => {
    openSetup();
  };

  const onCloseSetupClick = () => {
    closeSetup();
  };

  const onMouseDown = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      wizardSetup.style.top = (wizardSetup.offsetTop - shift.y) + `px`;
      wizardSetup.style.left = (wizardSetup.offsetLeft - shift.x) + `px`;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  const openSetup = () => {
    wizardSetup.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onSetupEscPress);
    setupClose.addEventListener(`keydown`, onCloseSetupEnterPress);
    setupClose.addEventListener(`click`, onCloseSetupClick);
    setupOpen.removeEventListener(`keydown`, onOpenSetupEnterPress);
    setupOpen.removeEventListener(`click`, onOpenSetupClick);
    userNameInput.addEventListener(`focus`, function () {
      document.removeEventListener(`keydown`, onSetupEscPress);
    });
    userNameInput.addEventListener(`blur`, function () {
      document.addEventListener(`keydown`, onSetupEscPress);
    });
    dialogHandle.addEventListener(`mousedown`, onMouseDown);
  };

  const closeSetup = () => {
    wizardSetup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onSetupEscPress);
    setupClose.removeEventListener(`keydown`, onCloseSetupEnterPress);
    setupClose.removeEventListener(`click`, onCloseSetupClick);
    setupOpen.addEventListener(`keydown`, onOpenSetupEnterPress);
    setupOpen.addEventListener(`click`, onOpenSetupClick);
    dialogHandle.removeEventListener(`mousedown`, onMouseDown);
    wizardSetup.style.top = ``;
    wizardSetup.style.left = ``;
  };

  setupOpen.addEventListener(`click`, onOpenSetupClick);
  setupOpen.addEventListener(`keydown`, onOpenSetupEnterPress);

})();
