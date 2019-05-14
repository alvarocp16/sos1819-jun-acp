describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get("https://sos1819-14.herokuapp.com/ui/v1/deceaseds/#!/");
		var deceaseds= element.all(by.repeater("deceased in deceaseds"));
	//	console.log("--");
	//	console.log(deceaseds);
	//	console.log("--");

		expect(deceaseds.count()).toBeGreaterThan(0);
	});
});
