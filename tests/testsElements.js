exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub", //api definida por selenium para lanzar los comandos
  chromeOnly: true,
  specs: ["TC01-dataElements.js","TC02-newElement.js","TC03-deleteElement.js"]//los test que vamos a lanzar
};