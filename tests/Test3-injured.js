describe("Check if a data can be deleted", function() {
    it('should delete a general public expenses ', function() {
        browser.
        get("http://localhost:8080/#!/ui/v1/injured-hospitalized");
        element.all(by.repeater('injured in injuredHospitalized')).then(function(getLista) {
            var d = element(by.model('delete(Badajoz)'));
            element(by.id('delete')).click();
        });
    });
});
