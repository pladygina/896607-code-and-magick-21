'use strict';

const WISARD_NAMES = [
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
const WIZARDS_QUANTITY = 4;

const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const createWizard = () => {
  let wizard = {};
  wizard.name = getRandomFromArray(WISARD_NAMES) + ` ` + getRandomFromArray(WIZARD_LASTNAMES);
  wizard.coatColor = getRandomFromArray(WIZARD_COATS);
  wizard.eyesColor = getRandomFromArray(WIZARD_EYES);
  return wizard;
};

const wizards = [];
for (let i = 0; i < WIZARDS_QUANTITY; i++) {
  wizards[i] = createWizard();
}

const wizardSetup = document.querySelector(`.setup`);
const setupSimilar = wizardSetup.querySelector(`.setup-similar`);
const similarList = setupSimilar.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);


wizardSetup.classList.remove(`hidden`);

const renderWizard = (wizard) => {
  let wizardItem = similarWizardTemplate.cloneNode(true);
  wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardItem.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardItem.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardItem;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarList.appendChild(fragment);

setupSimilar.classList.remove(`hidden`);
