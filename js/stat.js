'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_COLOR = `#ffffff`;
const SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;

const GAP = 10;
const CONTENT_GAP = 45;

const TEXT_COLOR = `#000000`;
const LINE_HEIGHT = 20;

const BAR_MAX_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;

const YOUR_COLOR = `rgba(255, 0, 0, 1)`;

const renderRectangle = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const getMaxElement = (array) => {
  let maxElement = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  const results = [];
  let yourNumber = 0;
  let maxTime = Math.round(getMaxElement(times));

  for (let i = 0; i < names.length; i++) {
    let result = {};
    let color = Math.round(Math.random() * 90) + 5;
    result.name = names[i];
    result.time = Math.round(times[i]);
    result.color = `hsl(235, 90%, ` + color + `%)`;
    result.bar = Math.round(BAR_MAX_HEIGHT * result.time / maxTime);
    if (result.name === `Вы`) {
      yourNumber = i;
    }
    results[i] = result;
  }

  if (yourNumber > 0) {
    let container = results[yourNumber];
    results[yourNumber] = results[0];
    results[0] = container;
  }

  results[0].color = YOUR_COLOR;

  renderRectangle(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      CLOUD_WIDTH,
      CLOUD_HEIGHT,
      SHADOW_COLOR
  );

  renderRectangle(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      CLOUD_WIDTH,
      CLOUD_HEIGHT,
      CLOUD_COLOR
  );

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = `PT Mono 16px`;
  ctx.fillText(
      `Ура вы победили!`,
      CLOUD_X + GAP + CONTENT_GAP,
      CLOUD_Y + GAP + LINE_HEIGHT
  );
  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + GAP + CONTENT_GAP,
      CLOUD_Y + GAP + LINE_HEIGHT * 2
  );

  for (let i = 0; i < results.length; i++) {
    let startX = CLOUD_X + GAP + CONTENT_GAP + (BAR_WIDTH + BAR_GAP) * i;
    let startY = CLOUD_Y + CLOUD_HEIGHT - (GAP + LINE_HEIGHT);

    ctx.fillStyle = TEXT_COLOR;

    ctx.fillText(
        results[i].time,
        startX,
        startY - results[i].bar - LINE_HEIGHT / 2
    );

    ctx.fillText(
        results[i].name,
        startX,
        startY + LINE_HEIGHT
    );

    renderRectangle(
        ctx,
        startX,
        startY - results[i].bar,
        BAR_WIDTH,
        results[i].bar,
        results[i].color
    );
  }
};
