/*global browser by element expect*/
describe("Check if data is loaded: ", function() {
    it("List shows that there are items", function() {
        browser.get("http://localhost:8080/#!/ui/v1/elements");
        var elementos = element.all(by.repeater("element in elements"));
        expect(elementos.count()).toBeGreaterThan(0);
    });
});
