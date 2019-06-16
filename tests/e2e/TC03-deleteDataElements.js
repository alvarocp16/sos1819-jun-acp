/*global browser by element expect*/
describe("Check if a data can be deleted", function() {
    it('should delete a element ', function() {
        browser.
        get("http://localhost:8080/#!/ui/v1/elements");
        check();
        function check() {
            element.all(by.repeater("element in elements"))
                .then(function(initial) {
                    if (initial.length == 10) {
                        element(by.css('[value="Siguiente Página"]')).click().then(check());
                    }else{
                        element.all(by.id('delete')).last().click().then(function() {
                            element.all(by.repeater("element in elements"))
                                .then(function(final) {
                                    expect(final.length).toEqual(initial.length - 1);
                                });
                        });
                    }
                });
        }
    });
});
