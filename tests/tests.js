exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: ["TC01-loadData.js", 
            "TC02-addData.js",
            "TC03-deleteData.js"]
};