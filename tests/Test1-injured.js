
describe("Check if data is loaded: ",function () {
    it("List shows that there are items", function (){
        browser.get("http://localhost:8080/#!/ui/v1/injured-hospitalized");
        var contacts = element.all(by.repeater("injured in injuredHospitalized"));
        expect(contacts.count()).toBeGreaterThan(0);
    });
    
     
});

