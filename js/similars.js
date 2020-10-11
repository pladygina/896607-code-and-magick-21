'use strict';

(function () {
  const WIZARD_NAMES = {
    firstNames: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
    secondNames: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`]
  };
  const WIZARDS_QUANTITY = 4;

  const createWizard = (names, lastNames) => {
    return {
      name: window.randomize.fromArray(names) + ` ` + window.randomize.fromArray(lastNames),
      coatColor: window.colorize.getRandomColor(`coats`),
      eyesColor: window.colorize.getRandomColor(`eyes`)
    };
  };

  const createWizards = function (names, lastNames, quantity) {
    let similars = [];
    for (let i = 1; i <= quantity; i++) {
      similars.push(createWizard(names, lastNames));
    }
    return similars;
  };

  const wizardSetup = document.querySelector(`.setup`);
  const setupSimilar = wizardSetup.querySelector(`.setup-similar`);
  const similarList = setupSimilar.querySelector(`.setup-similar-list`);

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const renderWizard = (wizard) => {
    let wizardItem = similarWizardTemplate.cloneNode(true);
    wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardItem.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardItem.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

    return wizardItem;
  };

  const fragment = document.createDocumentFragment();

  let wizards = createWizards(WIZARD_NAMES.firstNames, WIZARD_NAMES.secondNames, WIZARDS_QUANTITY);
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarList.appendChild(fragment);

  setupSimilar.classList.remove(`hidden`);
})();
