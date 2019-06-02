/*global browser by element expect*/
describe("Check if a data can be deleted", function() {
    it('should delete a element ', function() {
        browser.
        get("http://localhost:8080/#!/ui/v1/elements");
        element.all(by.repeater("element in elements"))
            .then(function(initial) {
                element.all(by.id('delete')).last().click().then(function(){
                element.all(by.repeater("element in elements"))
                    .then(function(final) {
                        expect(final.length).toEqual(initial.length - 1);
                    });
                });
            });
    });
});