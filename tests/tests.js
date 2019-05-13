exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub", //api definida por selenium para lanzar los comandos
  chromeOnly: true,
  specs: ["TC01-dataLoader.js"] //los test que vamos a lanzar
};