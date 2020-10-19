'use strict';

(function () {
  const WIZARDS_MAX_QUANTITY = 4;
  let wizardsQuantity = 0;

  const setupSimilar = window.nodes.wizardSetup.querySelector(`.setup-similar`);
  const similarList = setupSimilar.querySelector(`.setup-similar-list`);

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const renderWizard = (wizard) => {
    let wizardItem = similarWizardTemplate.cloneNode(true);
    wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardItem.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardItem.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardItem;
  };

  window.similars = {
    successHandler: (wizards) => {
      const fragment = document.createDocumentFragment();

      for (let i = wizardsQuantity; i < WIZARDS_MAX_QUANTITY; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
        wizardsQuantity++;
      }
      similarList.appendChild(fragment);
      setupSimilar.classList.remove(`hidden`);
    }
  };
})();
