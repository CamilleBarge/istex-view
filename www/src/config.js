const defaultConfig = {
  istexApiUrl: 'https://api.istex.fr',
  istexArkUrl: 'https://ark.istex.fr'
};

const localConfig = require('./config.local.json');

module.exports = {
  ...defaultConfig,
  ...localConfig
};