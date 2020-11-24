'use strict';

const GEO_API_URL = `https://geo.ipify.org/api/v1/`;

const getDefaultApi = (key) => {
  return GEO_API_URL + `?apiKey=${key}&ipAddress=`;
};

const getApi = (key, text) => {
  let api = GEO_API_URL + `?apiKey=${key}`;

  if (window.util.isIPAddress(text)) {
    api = api + `&ipAddress=${text}`;
  } else {
    api = api + `&domain=${text}`;
  }

  return api;
};

const request = (api, onLoad, onError) => {
  let xhr = new XMLHttpRequest();

  xhr.responseType = `json`;
  xhr.open(`GET`, api);

  xhr.addEventListener(`load`, () => {
    const res = xhr.response;

    if (xhr.status === 200) {
      onLoad(res);
    } else {
      onError(res);
    }
  });

  xhr.send();
};

window.backend = {
  getDefaultApi,
  getApi,
  request
};
