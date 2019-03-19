var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var deceaseds = [{
    province: "Alava",
    number: "10",
    year: "2015"
}, {
    province: "Albacete",
    number: "22",
    year: "2015"
}];

//GET /deceaseds/
app.get("/deceaseds", (req, res) => {
    res.send(deceaseds);
});

//POST /deceaseds/
app.post("/deceaseds", (req, res) => {

    var newDeceased = req.body;

    deceaseds.push(newDeceased)

    res.sendStatus(201);
});

//POST /deceaseds/:province
app.post("/deceaseds", (req, res) => {

    res.sendStatus(405);
});

//DELETE /deceaseds/

app.delete("/deceaseds", (req, res) => {

    deceaseds = [];

    res.sendStatus(200);
});

//GET /deceaseds/albacete

app.get("/deceaseds/:province", (req, res) => {

    var province = req.params.province;

    var filteredDeceaseds = deceaseds.filter((c) => {
        return c.province == province;
    })

    if (filteredDeceaseds.length >= 1) {
        res.send(filteredDeceaseds[0]);
    }
    else {
        res.sendStatus(404);
    }

});

//PUT /deceaseds/petr

app.put("/deceaseds/:province", (req, res) => {

    var province = req.params.province;
    var updatedContact = req.body;
    var found = false;

    var updatedDeceaseds = deceaseds.map((c) => {
        if (c.province == province) {
            found = true;
            return updatedContact;
        }else{
            return c;
        }
    });

    if (found == false) {
        return res.sendStatus(404);
    }
    else {
        deceaseds = updatedDeceaseds;
        return res.sendStatus(200);
    }

});

//PUT /deceaseds/

app.put("/deceaseds/", (req, res) => {
    return res.sendStatus(405);
});

//DELETE /deceaseds/petr

app.delete("/deceaseds/:province", (req, res) => {

    var province = req.params.province;
    var found = false;

    var updatedDeceaseds = deceaseds.filter((c) => {
        if (c.province == province) {
            found = true;
        }
        return c.province != province;
    });

    if (found == false) {
        return res.sendStatus(404);
    }
    else {
        deceaseds = updatedDeceaseds;
        return res.sendStatus(200);
    }

});

app.listen(port, () => {
    console.log("I'm ready on port " + port);

});


