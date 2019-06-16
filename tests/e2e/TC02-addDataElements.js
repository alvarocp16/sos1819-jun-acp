/*global browser by element expect*/
describe("Check if a new element can be created", function() {
    it("List should grow after the element creation", function() {
        browser.get("http://localhost:8080/#!/ui/v1/elements");
        check();
        function check() {
            element
                .all(by.repeater("element in elements"))
                .then(function(initialElements) {
                        if (initialElements.length == 10) {
                            element(by.css('[value="Siguiente Página"]')).click().then(check());
                        }else{
                            element(by.model('newElement.province')).sendKeys('Canarias');
                            element(by.model('newElement.year')).sendKeys(2000);
                            element(by.model('newElement.victims')).sendKeys(1);
                            element(by.model('newElement.injurednothospitalizedinaccidents')).sendKeys(1);
                            element(by.model('newElement.accidentswithvictims')).sendKeys(1);
                            element(by.css('[id="add"]')).click();
                            element
                                .all(by.repeater("element in elements"))
                                .then(function(finalElements) {
                                    expect(finalElements.length).toEqual(initialElements.length + 1);
                                });
                        }
                    
                });
        }
    });
});
