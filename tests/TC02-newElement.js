describe("Check if a new element can be created", function () {
	it("List should grow after the element creation", function (){
		browser.get("http://localhost:8080");
		var initialElements =
		element
			.all(by.repeater("element in elements"))
			.then( function(initialElements) {
				element(by.model('newElement.province')).sendKeys('prueba');
				element(by.model('newElement.year')).sendKeys('2000');
				element(by.model('newElement.victims')).sendKeys('1111');
				element(by.model('newElement.injurednothospitalizedinaccidents')).sendKeys('1111');
				element(by.model('newElement.accidentswithvictims')).sendKeys('1111');
	
				element(by.css('[value="add"]')).click();
				element
					.all(by.repeater("element in elements"))
					.then( function(finalElements) {
						expect(finalElements.length).toEqual(initialElements.length+1);
					});
			});
	});
});