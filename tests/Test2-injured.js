describe("Check if a new data can be created", function() {
    it('should add a new data general public expenses', function() {
        browser.
        get("http://localhost:8080/#!/ui/v1/injured-hospitalized");
        element.all(by.repeater('injured in injuredHospitalized')).then(function(getLista) {

            element(by.model('newInjuredHospitalized.province')).sendKeys('china');
            element(by.model('newInjuredHospitalized.year')).sendKeys(2015);
            element(by.model('newInjuredHospitalized.accident_with_victim')).sendKeys(234);
            element(by.model('newInjuredHospitalized.number_of_deceased')).sendKeys(234);
            element(by.model('newInjuredHospitalized.injured_hospitalized')).sendKeys(234);


            element(by.id('add')).click();

            element.all(by.repeater('injured in injuredHospitalized')).then(function(getListaFinal) {

                expect(getListaFinal.length).toEqual(getLista.length + 1);
            });
        });
    });
});
