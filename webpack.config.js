const path = require(`path`);

module.exports = {
  entry: [
    `./source/js/leaflet.js`,
    `./source/js/util.js`,
    `./source/js/backend.js`,
    `./source/js/render.js`,
    `./source/js/map.js`,
    `./source/js/script.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, `dist/js`),
    iife: true
  },
  devtool: false
};
