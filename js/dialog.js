'use strict';

(function () {

  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = window.nodes.wizardSetup.querySelector(`.setup-close`);
  const dialogHandle = window.nodes.wizardSetup.querySelector(`.upload`);

  const onSetupEscPress = (evt) => {
    window.utils.isEscEvent(evt, closeSetup);
  };

  const onOpenSetupEnterPress = (evt) => {
    window.utils.isEnterEvent(evt, openSetup);
  };

  const onCloseSetupEnterPress = (evt) => {
    window.utils.isEnterEvent(evt, closeSetup);
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

      window.nodes.wizardSetup.style.top = (window.nodes.wizardSetup.offsetTop - shift.y) + `px`;
      window.nodes.wizardSetup.style.left = (window.nodes.wizardSetup.offsetLeft - shift.x) + `px`;

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
    window.nodes.wizardSetup.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onSetupEscPress);
    setupClose.addEventListener(`keydown`, onCloseSetupEnterPress);
    setupClose.addEventListener(`click`, onCloseSetupClick);
    setupOpen.removeEventListener(`keydown`, onOpenSetupEnterPress);
    setupOpen.removeEventListener(`click`, onOpenSetupClick);
    window.nodes.userNameInput.addEventListener(`focus`, function () {
      document.removeEventListener(`keydown`, onSetupEscPress);
    });
    window.nodes.userNameInput.addEventListener(`blur`, function () {
      document.addEventListener(`keydown`, onSetupEscPress);
    });
    dialogHandle.addEventListener(`mousedown`, onMouseDown);
    window.backend.load(window.similars.successHandler, window.utils.errorHandler);
  };

  const closeSetup = () => {
    window.nodes.wizardSetup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onSetupEscPress);
    setupClose.removeEventListener(`keydown`, onCloseSetupEnterPress);
    setupClose.removeEventListener(`click`, onCloseSetupClick);
    setupOpen.addEventListener(`keydown`, onOpenSetupEnterPress);
    setupOpen.addEventListener(`click`, onOpenSetupClick);
    dialogHandle.removeEventListener(`mousedown`, onMouseDown);
    window.nodes.wizardSetup.style.top = ``;
    window.nodes.wizardSetup.style.left = ``;
  };

  setupOpen.addEventListener(`click`, onOpenSetupClick);
  setupOpen.addEventListener(`keydown`, onOpenSetupEnterPress);

  const setupForm = document.querySelector(`.setup-wizard-form`);
  const submitHandler = (evt) => {
    window.backend.save(new FormData(setupForm), closeSetup, window.utils.errorHandler);
    evt.preventDefault();
  };

  setupForm.addEventListener(`submit`, submitHandler);

})();
