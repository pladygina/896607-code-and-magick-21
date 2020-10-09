'use strict';

const wizardSetup = document.querySelector(`.setup`);
const userNameInput = wizardSetup.querySelector(`.setup-user-name`);
const userNameMinLength = userNameInput.minLength;
const userNameMaxLength = userNameInput.maxLength;

userNameInput.addEventListener(`input`, function () {
  let userNameLength = userNameInput.value.length;
  if (userNameLength < userNameMinLength) {
    userNameInput.setCustomValidity(`Еще ` + (userNameMinLength - userNameLength) + ` симв.`);
  } else if (userNameLength > userNameMaxLength) {
    userNameInput.setCustomValidity(`Удалите лишние  ` + (userNameLength - userNameMaxLength) + ` симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }
  userNameInput.reportValidity();
});

const setupWizard = document.querySelector(`.setup-wizard`);
const wizardCoatColor = setupWizard.querySelector(`.wizard-coat`);
const wizardEyesColor = setupWizard.querySelector(`.wizard-eyes`);
const wizardFireColor = document.querySelector(`.setup-fireball-wrap`);

let coatColorInput = document.querySelector(`input[name=coat-color]`);
let eyesColorInput = document.querySelector(`input[name=eyes-color]`);
let fireballColorInput = document.querySelector(`input[name=fireball-color]`);

window.colorize.repaintItem(`coats`, wizardCoatColor, coatColorInput);
window.colorize.repaintItem(`eyes`, wizardEyesColor, eyesColorInput);
window.colorize.repaintItem(`fireballs`, wizardFireColor, fireballColorInput);
