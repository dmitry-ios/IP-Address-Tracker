'use strict';

const leafletMap = window.L.map(`mapid`).setView([51.505, -0.09], 13);
const pathname = window.location.pathname;
const baseUrl = window.location.origin + (pathname.length > 1 ? pathname : ``);
const markerIcon = window.L.icon({iconUrl: baseUrl + `/img/icon-location.svg`});

const API_URL = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG1pdHJ5YiIsImEiOiJja2hld293cW8wYThxMnNwbDkxdWhwNjZlIn0.EI5vC4TroTo2dOQN-deCQQ`;

const tileData = {
  attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
  maxZoom: 18,
  id: `mapbox/streets-v11`,
  tileSize: 512,
  zoomOffset: -1
};

let previousMarker = null;

const setupMarker = (jsonObject) => {
  const lat = jsonObject[`location`][`lat`];
  const lng = jsonObject[`location`][`lng`];
  const marker = window.L.marker([lat, lng], {icon: markerIcon});

  if (previousMarker) {
    previousMarker.remove();
  }

  marker.addTo(leafletMap);
  leafletMap.setView([lat, lng], 13);

  previousMarker = marker;
};

window.L.tileLayer(API_URL, tileData).addTo(leafletMap);

window.map = {
  setupMarker
};
