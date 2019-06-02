exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: ["TC01-loadDataElements.js"
            ,"TC02-addDataElements.js"
            ,"TC03-deleteDataElements.js"]
};