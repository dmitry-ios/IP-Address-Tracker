'use strict';

const ipDescription = document.querySelector(`.info-list__description--ip`);
const locationDescription = document.querySelector(`.info-list__description--location`);
const timezoneDescription = document.querySelector(`.info-list__description--timezone`);
const ispDescription = document.querySelector(`.info-list__description--isp`);
const errorTemplate = document.querySelector(`#error`).content;
const errorPopup = errorTemplate.querySelector(`.error`);

const renderInformation = (jsonObject) => {
  const textLocation = jsonObject[`location`][`city`] + `, ` + jsonObject[`location`][`region`];
  const textTimezone = `UTC ` + jsonObject[`location`][`timezone`];

  ipDescription.textContent = jsonObject[`ip`];
  locationDescription.textContent = textLocation;
  timezoneDescription.textContent = textTimezone;
  ispDescription.textContent = jsonObject[`isp`];
};

const renderErrorMessage = (err) => {
  const errorNode = errorPopup.cloneNode(true);
  const textMessage = `Error ${err.code} ` + err.messages;

  errorNode.querySelector(`.error__message`).textContent = textMessage;
  errorNode.querySelector(`.error__button`).addEventListener(`click`, () => {
    clearErrorMessage();
  });

  document.body.insertAdjacentElement(`afterbegin`, errorNode);
};

const clearErrorMessage = () => {
  const oldErrorMessage = document.querySelector(`.error`);
  if (oldErrorMessage) {
    oldErrorMessage.remove();
  }
};

window.render = {
  renderInformation,
  renderErrorMessage,
  clearErrorMessage
};
