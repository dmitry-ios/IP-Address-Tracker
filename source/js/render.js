'use strict';

const ipDescription = document.querySelector(`.info-list__description--ip`);
const locationDescription = document.querySelector(`.info-list__description--location`);
const timezoneDescription = document.querySelector(`.info-list__description--timezone`);
const ispDescription = document.querySelector(`.info-list__description--isp`);

const renderInformation = (jsonObject) => {
  const textLocation = jsonObject[`location`][`city`] + `, ` + jsonObject[`location`][`region`];
  const textTimezone = `UTC ` + jsonObject[`location`][`timezone`];

  ipDescription.textContent = jsonObject[`ip`];
  locationDescription.textContent = textLocation;
  timezoneDescription.textContent = textTimezone;
  ispDescription.textContent = jsonObject[`isp`];
};

const renderErrorMessage = (err) => {
  console.log(err);
};

window.render = {
  renderInformation,
  renderErrorMessage
};
