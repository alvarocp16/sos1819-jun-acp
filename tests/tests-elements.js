exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: ["e2e/TC01-loadDataElements.js"
            ,"e2e/TC02-addDataElements.js"
            ,"e2e/TC03-deleteDataElements.js"]
};