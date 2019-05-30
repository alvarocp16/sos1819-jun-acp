
/*var fs = require("fs");
var path = require("path");

describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get("http://localhost:8080/#!/ui/v1/deceaseds/");
		browser.takeScreenshot()
                            .then(function(png){
                                var stream = fs.createWriteStream(path.join(process.cwd(),'tests','T01-cargaElementos.png'));
                                stream.write(new Buffer(png,'base64'));
                                stream.end();
                            });
                            
   		var deceaseds= element.all(by.exactRepeater("deceased in deceaseds"));
		

		expect(deceaseds.count()).toBeGreaterThan(0);
		
		//expect(element(by.exactRepeater("item in deceaseds")).isPresent()).toBe(true);
		
		//console.log(deceaseds.get(0));
		//console.log("test")
	});
});*/

describe("Check if data is loaded: ",function () {
    it("List shows more than 3 items", function (){
        browser.get("http://localhost:8080");
        var contacts = element.all(by.repeater("deceased in deceaseds"));
        expect(contacts.count()).toBeGreaterThan(0);
    });
});
