'use strict';

const WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];
const WIZARD_LASTNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];
const WIZARD_COATS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const WIZARD_EYES = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];
const WIZARD_FIREBALLS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];
const WIZARDS_QUANTITY = 4;

const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const createWizard = () => {
  return {
    name: getRandomFromArray(WIZARD_NAMES) + ` ` + getRandomFromArray(WIZARD_LASTNAMES),
    coatColor: getRandomFromArray(WIZARD_COATS),
    eyesColor: getRandomFromArray(WIZARD_EYES)
  };
};

const createWizards = (quantity) => {
  let similars = [];
  for (let i = 1; i <= quantity; i++) {
    similars.push(createWizard());
  }
  return similars;
};

const wizardSetup = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = wizardSetup.querySelector(`.setup-close`);
const setupSimilar = wizardSetup.querySelector(`.setup-similar`);
const similarList = setupSimilar.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const onSetupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeSetup();
  }
};

const openSetup = () => {
  wizardSetup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onSetupEscPress);
};
const closeSetup = () => {
  wizardSetup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onSetupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openSetup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openSetup();
  }
});

setupClose.addEventListener(`click`, function () {
  closeSetup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closeSetup();
  }
});

const renderWizard = (wizard) => {
  let wizardItem = similarWizardTemplate.cloneNode(true);
  wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardItem.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardItem.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardItem;
};

const fragment = document.createDocumentFragment();
let wizards = createWizards(WIZARDS_QUANTITY);
for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarList.appendChild(fragment);

setupSimilar.classList.remove(`hidden`);

const userNameInput = wizardSetup.querySelector(`.setup-user-name`);
const userNameMinLength = userNameInput.minLength;
const userNameMaxLength = userNameInput.maxLength;

userNameInput.addEventListener(`focus`, function () {
  document.removeEventListener(`keydown`, onSetupEscPress);
});

userNameInput.addEventListener(`blur`, function () {
  document.addEventListener(`keydown`, onSetupEscPress);
});

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
let coatColorNumber = 0;
let eyesColorNumber = 0;
let fireballColorNumber = 0;

const shiftColor = (colors, number) => {
  return number < (colors.length - 1) ? number + 1 : 0;
};

const repaintItem = (colors, number, element, input) => {
  number = shiftColor(colors, number);
  input.value = colors[number];
  element.style.fill = colors[number];
  return number;
};

const repaintBackground = (colors, number, element, input) => {
  number = shiftColor(colors, number);
  input.value = colors[number];
  element.style.backgroundColor = colors[number];
  return number;
};

wizardCoatColor.addEventListener(`click`, function () {
  coatColorNumber = repaintItem(WIZARD_COATS, coatColorNumber, wizardCoatColor, coatColorInput);
});


wizardEyesColor.addEventListener(`click`, function () {
  eyesColorNumber = repaintItem(WIZARD_EYES, eyesColorNumber, wizardEyesColor, eyesColorInput);
});

wizardFireColor.addEventListener(`click`, function () {
  fireballColorNumber = repaintBackground(WIZARD_FIREBALLS, fireballColorNumber, wizardFireColor, fireballColorInput);
});
