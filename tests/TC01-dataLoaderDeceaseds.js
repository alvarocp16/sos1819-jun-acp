describe('expenses is Loaded', function() {
    it('should show some expenses', function() {
        browser
            .get('https://sos1819-14.herokuapp.com/ui/v1/deceaseds/#!/')
            .then(function() {
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);


                element
                    .all(by.repeater("deceased in deceaseds"))
                    .then(function(deceaseds) {
                        expect(deceaseds.length).toBeGreaterThan(0);
                        console.log("the length of data is: " + deceaseds.length);
                    })
            })
    })
});
