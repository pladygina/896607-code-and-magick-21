'use strict';

(function () {
  const WIZARDS_MAX_QUANTITY = 4;
  let wizards = [];

  const setupSimilar = window.nodes.wizardSetup.querySelector(`.setup-similar`);
  const similarList = setupSimilar.querySelector(`.setup-similar-list`);

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const getRank = (wizard) => {
    let rank = 0;
    if (wizard.colorCoat === window.colorize.getColor(`coats`)) {
      rank += 2;
    }
    if (wizard.colorEyes === window.colorize.getColor(`eyes`)) {
      rank += 1;
    }
    return rank;
  };

  const namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const renderWizard = (wizard) => {
    let wizardItem = similarWizardTemplate.cloneNode(true);
    wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardItem.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardItem.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardItem;
  };

  const renderSimilarList = (similars) => {
    const wizardsQuantity = similars.length > WIZARDS_MAX_QUANTITY
      ? WIZARDS_MAX_QUANTITY : similars.length;

    similarList.innerHTML = ``;

    for (let i = 0; i < wizardsQuantity; i++) {
      similarList.appendChild(renderWizard(wizards[i]));
    }
    setupSimilar.classList.remove(`hidden`);
  };

  window.similars = {
    updateWizards: () => {
      renderSimilarList(wizards.sort(function (left, right) {
        let rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }
        return rankDiff;
      }));
    },
    successHandler: (data) => {
      wizards = data;
      window.similars.updateWizards();
    }
  };
})();
