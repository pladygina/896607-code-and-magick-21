'use strict';
const userNameMinLength = window.nodes.userNameInput.minLength;
const userNameMaxLength = window.nodes.userNameInput.maxLength;

window.nodes.userNameInput.addEventListener(`input`, function () {
  let userNameLength = window.nodes.userNameInput.value.length;
  if (userNameLength < userNameMinLength) {
    window.nodes.userNameInput.setCustomValidity(`Еще ` + (userNameMinLength - userNameLength) + ` симв.`);
  } else if (userNameLength > userNameMaxLength) {
    window.nodes.userNameInput.setCustomValidity(`Удалите лишние  ` + (userNameLength - userNameMaxLength) + ` симв.`);
  } else {
    window.nodes.userNameInput.setCustomValidity(``);
  }
  window.nodes.userNameInput.reportValidity();
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
