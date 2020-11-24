'use strict';

const searchKeyInput = document.querySelector(`.search__key`);
const searchTextInput = document.querySelector(`.search__text`);
const submitButton = document.querySelector(`.search__button`);

const setInformation = (api) => {
  window.backend.request(api, function (res) {
    window.render.renderInformation(res);
    window.map.setupMarker(res);
  }, function (err) {
    window.render.renderErrorMessage(err);
  });
};

const setUserInformation = () => {
  const key = searchKeyInput.value;
  const api = window.backend.getDefaultApi(key);

  setInformation(api);
};

const setInputInformation = () => {
  const key = searchKeyInput.value;
  const text = searchTextInput.value;
  const api = window.backend.getApi(key, text);

  setInformation(api);
}

submitButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  setInputInformation();
});

setUserInformation();
