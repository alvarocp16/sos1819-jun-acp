exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: ["Test1-injured.js", 
            "Test2-injured.js",
            "Test3-injured.js"]
};