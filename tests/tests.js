exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub", //api definida por selenium para lanzar los comandos
  chromeOnly: true,
  capabilities: {
        'browserName': 'phantomjs',
  },
  specs: ["TC01-dataLoaderDeceaseds.js"] //los test que vamos a lanzar
};