'use strict';

const searchForm = document.querySelector(`.search`);
const searchKeyInput = document.querySelector(`.search__key`);
const searchTextInput = document.querySelector(`.search__text`);
const submitButton = document.querySelector(`.search__button`);

const onFormSuccessLoad = (res) => {
  searchForm.classList.remove(`search--process`);
  window.render.renderInformation(res);
  window.map.setupMarker(res);
};

const onFormErrorLoad = (err) => {
  searchForm.classList.remove(`search--process`);
  window.render.renderErrorMessage(err);
};

const setInformation = (api) => {
  searchForm.classList.add(`search--process`);
  window.backend.request(api, onFormSuccessLoad, onFormErrorLoad);
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
};

submitButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  window.render.clearErrorMessage();
  setInputInformation();
});

setUserInformation();
