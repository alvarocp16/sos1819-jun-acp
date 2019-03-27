var express = require("express");

var bodyParser = require("body-parser");

var path = require("path");

var app = express();

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "/api/v1/YYYYYY")));


var port = process.env.PORT || 8080;

//============ Antonio Perez ============

const MongoClient = require("mongodb").MongoClient;
const uriaps = "mongodb+srv://antoniops96:ANpeso96@sos1819-14-aps-htbgq.mongodb.net/test?retryWrites=true";
const clientaps = new MongoClient(uriaps, { useNewUrlParser: true });

var deceaseds;

clientaps.connect(err => {
    deceaseds = clientaps.db("sos1819-14-aps").collection("deceaseds");
    // perform actions on the collection object
    console.log("Connected!");
});

app.get("/api/v1/deceaseds/docs/", (req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/1804509/S17tS8Nc");
});

/*
var deceaseds = [{
    province: "Alava",
    number: "10",
    year: "2015"
}, {
    province: "Albacete",
    number: "22",
    year: "2015"
}];
*/
//GET /deceaseds/
app.get("/api/v1/deceaseds", (req, res) => {

    deceaseds.find({}).toArray((err, deceasedsArray) => {
        if (err) {
            console.log("Error" + err);
        }
        res.send(deceasedsArray);
    });

});

//GET /api/v1/YYYYYY/loadInitialData

app.get("/api/v1/deceaseds/loadInitialData", (req, res) => {
    
    var newDeceased = [{
        province: "Badajoz",
        number: "60",
        year: "2015"
    },

    {
        province: "Malaga",
        number: "20",
        year: "2015"
    },

    {
        province: "Seville",
        number: "10",
        year: "2015"
    },

    {
        province: "Madrid",
        number: "40",
        year: "2015"
    },

    {
        province: "Huelva",
        number: "10",
        year: "2015"
    }
];

     deceaseds.find({}).toArray((err, deceasedsArray) => {
        if(err){
            console.log("Error: " + err);
        }
        if(deceasedsArray.length==0){
            deceaseds.insert(newDeceased);
            res.sendStatus(200);
        }else{
            res.sendStatus(409);
        }
    });
});


//POST /deceaseds/

app.post("/api/v1/deceaseds", (req, res) => {

    var newDeceased = req.body;
    var province = req.body.province;
    var year = req.body.year;

    deceaseds.find({ province: province, year: year }).toArray((err, deceasedsArray) => {
        if (err) {
            console.log(err);
        }
        if (deceasedsArray != 0) {

            res.sendStatus(409);

        }
        else {

            deceaseds.insert(newDeceased);

            res.sendStatus(201);
        }
    });
});



//POST /deceaseds/Alava
app.post("/api/v1/deceaseds/:province", (req, res) => {

    res.sendStatus(405);
});



//GET /deceaseds/albacete

app.get("/api/v1/deceaseds/:province", (req, res) => {
    var province = req.params.province;
    deceaseds.find({ province: province }).toArray((err, filtered) => {
        if (err) {
            console.log("Error:" + err);
        }
        if (filtered.length >= 1) {
            res.send(filtered);
        }
        else {
            res.sendStatus(404);
        }
    });
});

//PUT /deceaseds/petr

app.put("/api/v1/deceaseds/:province", (req, res) => {

    var province = req.params.province;
    var newDeceased = req.body;
    var found = false;

    deceaseds.find({ "province": province }).toArray((err, deceasedsArray) => {
        if (err)
            console.log(err);

        if (deceasedsArray == 0) {

            res.sendStatus(404);

        }
        else if (req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("number") == false ||
            req.body.province != province) {

            res.sendStatus(400);

        }
        else {

            deceaseds.updateOne({ "province": province }, { $set: newDeceased });
            res.sendStatus(200);

        }
    });
});

//PUT /deceaseds

app.put("/api/v1/deceaseds/", (req, res) => {

    res.sendStatus(405);
});


//DELETE /deceaseds/petr

app.delete("/api/v1/deceaseds/:province", (req, res) => {

    var province = req.params.province;
    deceaseds.find({ "province": province }).toArray((err, deceasedsArray) => {
        if (err) {
            console.log("Error: " + err);
        }
        if (deceasedsArray.length == 0) {
            res.send(404);
        }
        else {
            deceaseds.deleteOne({ "province": province });
            res.send(200);
        }
    });

});


//DELETE /deceaseds/

app.delete("/api/v1/deceaseds", (req, res) => {
    deceaseds.remove({});
    res.sendStatus(200);
});


//=========================================================================== Chamorro ======================================

/*var elements = [{
    province: "sevilla",
    year: "2016",
    victims: "3.863"
}, {
    province: "sevilla",
    year: "2015",
    victims: "4.200"
}, {
    province: "sevilla",
    year: "2014",
    victims: "3.023"
}, {
    province: "asturias",
    year: "2016",
    victims: "1.327"
}, {
    province: "asturias",
    year: "2015",
    victims: "1.413"
}, {
    province: "asturias",
    year: "2014",
    victims: "1.295"
}];*/

const uriacp = "mongodb+srv://test:test@sos-wje4l.mongodb.net/sos1819?retryWrites=true";
const clientacp = new MongoClient(uriacp, { useNewUrlParser: true });

var elements;
clientacp.connect(err => {
    elements = clientacp.db("sos1819").collection("elements");
    console.log("Connected!");
});

app.get("/api/v1/elements/docs/", (req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/1804509/S17tS8Nc");
});
// GET /elements/
//F03
/*app.get("/api/v1/elements", (req,res)=>{
    res.send(elements);
});*/
//F04
app.get("/api/v1/elements/", (req, res) => {
    elements.find({}).toArray((err, elementsArray) => {
        if (err)
            console.log("Error: " + err);
        res.send(elementsArray);
    });
});

app.get("/api/v1/elements/:province/:year", (req, res) => {
    //var newElement = req.body;
    var year = req.params.year;
    var province = req.params.province;
    
    elements.find({"province": province,"year": year}).toArray((err, elementArray) => {
        if (err){
            console.log("Error: " + err);
        }
        if (elementArray.length > 0) {
            res.send(elementArray);
        } else {
            res.sendStatus(404);
        }
    });
});
// GET /api/v1/companies-stats/docs
app.get("/api/v1/elements/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/7064258/S17us6KT");
});
//GET /api/v1/YYYYYY/loadInitialData
//F03
/*app.get("/api/v1/elements/loadInitialData", (req, res) => {

    var newDeceased = {
    province: "sevilla",
    year: "2015",
    victims: "4.200"
    };
    var newDeceased2 = {
    province: "sevilla",
    year: "2014",
    victims: "3.023"
    };
    
    deceaseds.push(newDeceased);
    deceaseds.push(newDeceased2);
    

    res.sendStatus(201);
});*/
//F04
app.get("/api/v1/elements/loadInitialData", (req, res) => {

    var elementsInitials = [{
    province: "sevilla",
    year: "2014",
    victims: "5.014"
    },{
    province: "madrid",
    year: "2015",
    victims: "3.305"
    },{
    province: "albacete",
    year: "2016",
    victims: "8.654"
    },{
    province: "jaen",
    year: "2013",
    victims: "41.367"
    },{
    province: "badajoz",
    year: "2017",
    victims: "41.641"
    },{
    province: "caceres",
    year: "2018",
    victims: "6.419"
    }];
    elements.find({}).toArray((err, elementsArray) => {
        if(err){
            console.log("Error: " + err);
        }
        if(elementsArray.length==0){
            elements.insert(elementsInitials);
            res.sendStatus(200);
        }else{
            res.sendStatus(409);
        }
    });
});


// POST /elements/
//F03
/*app.post("/api/v1/elements", (req,res)=>{
    var newElement = req.body;
    elements.push(newElement);
    res.sendStatus(201);
});*/
//F04
app.post("/api/v1/elements", (req, res) => {
    var newElement = req.body;
    var province = req.body.province;
    var year = req.body.year;
    elements.find({ province: province, year: year }).toArray((err, elementsArray) => {
        if (err) {
            console.log(err);
        }
        if (elementsArray != 0) {
            res.sendStatus(409);
        }
        else {
            elements.insertOne(newElement);
            res.sendStatus(201);
        }
    });
});
// POST /elements/:province
//F03 y F04(es igual)
app.post("/api/v1/elements/:province", (req, res) => {
    res.sendStatus(405);
});
// DELETE /elements/
//F03
/*app.delete("/api/v1/elements", (req,res)=>{
    
    elements =  [];

    res.sendStatus(200);
});*/
//F04
app.delete("/api/v1/elements", (req, res) => {
    elements.remove({});
    res.sendStatus(200);
});


// GET /elements/sevilla
//F03
/*app.get("/api/v1/elements/:province", (req,res)=>{

    var province = req.params.province;

    var filteredElements = elements.filter((c) =>{
       return c.province == province; 
    });
    
    if (filteredElements.length >= 1){
        res.send(filteredElements[0]);
    }else{
        res.sendStatus(404);
    }
});*/
//F04
app.get("/api/v1/elements/:province", (req, res) => {
    var province = req.params.province;
    elements.find({ "province": province }).toArray((err, filtered) => {
        if (err) {
            console.log("Error:" + err);
        }
        if (filtered.length >= 1) {
            res.send(filtered[0]);
        }
        else {
            res.sendStatus(404);
        }
    });
});

// PUT /elements/sevilla
//F03
/*app.put("/api/v1/elements/:province", (req,res)=>{
    var province = req.params.province;
    var updatedElement = req.body;
    var found = false;
    var updatedElements = elements.map((c) =>{
        if(c.province == province){
            found = true;
            return updatedElement;
        }else{
            return c;            
        }
    });
    if (found == false){
        res.sendStatus(404);
    }else{
        elements = updatedElements;
        res.sendStatus(200);
    }
});*/
//F04
app.put("/api/v1/elements/:province", (req, res) => {
    var province = req.params.province;
    var updatedElement = req.body;
    var found = false;
    elements.find({ "province": province }).toArray((err, elementsArray) => {
        if (err)
            console.log(err);
        if (elementsArray == 0) {
            res.sendStatus(404);
        }
        else if (req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("victims") == false || req.body.province != province) {
            res.sendStatus(400);
        }
        else {
            elements.updateOne({ "province": province }, { $set: updatedElement });
            res.sendStatus(200);
        }
    });
});
// PUT /elements/
//F03 y F04, es igual
app.put("/api/v1/elements", (req, res) => {
    res.sendStatus(405);
});

//F04
app.delete("/api/v1/elements/:province", (req, res) => {
    var province = req.params.province;
    elements.find({ "province": province }).toArray((err, arrayElements) => {
        if (err) {
            console.log("Error: " + err);
        }
        if (arrayElements.length == 0) {
            res.send(404);
        }
        else {
            elements.deleteOne({ "province": province });
            res.send(200);
        }
    });

});
// ======================================================== PETI =====================================================================

/*
var injuredHospitalized = [{
    province: "Sevilla",
    year: "2016",
    accidents:"356"
}, {
    province: "Madrid",
    year: "2016",
    accidents: "567"
}];
*/

const uri = "mongodb+srv://test:test@sos-sb5wi.mongodb.net/sos1819?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });


var injuredHospitalized;

client.connect(err => {
    injuredHospitalized = client.db("sos1819").collection("injured-hospitalized");
    console.log("Connected!");
});


app.get("/api/v1/injured-hospitalized/docs/", (req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/6976657/S17usmD2");
});

//loadInitialData

app.get("/api/v1/injured-hospitalized/loadInitialData", (req, res) => {


    var injurHospitalized = [{
            province: "Sevilla",
            year: "2016",
            accident: "356"
        },

        {
            province: "Madrid",
            year: "2016",
            accident: "567"
        },

        {
            province: "Madrid",
            year: "2016",
            accident: "935"
        },

        {
            province: "Huelva",
            year: "2013",
            accident: "863"
        },

        {
            province: "Asturias",
            year: "2014",
            accident: "567"
        }

    ];

    injuredHospitalized.find({}).toArray((err, injHospitalizedArray) => {
        if(err){
            console.log("Error: " + err);
        }
        if(injHospitalizedArray.length==0){
            injuredHospitalized.insert(injurHospitalized);
            res.sendStatus(200);
        }else{
            res.sendStatus(409);
        }
    });
});

// GET /injured-hospitalized

app.get("/api/v1/injured-hospitalized", (req, res) => {

    injuredHospitalized.find({}).toArray((err, injuredHospitalizedArray) => {
        if (err) {
            console.log("Error" + err);
        }
        res.send(injuredHospitalizedArray);
    });

});


// POST /injured-hospitalized/

app.post("/api/v1/injured-hospitalized", (req, res) => {

    var newInjuredHospitalized = req.body;
    var province = req.body.province;
    var year = req.body.year;
    console.log(newInjuredHospitalized);

    injuredHospitalized.find({ province: province, year: year }).toArray((err, injuredHospitalizedArray) => {
        if (err) {
            console.log(err);
        }
        if (injuredHospitalizedArray != 0) {

            res.sendStatus(409);

        }
        else {

            injuredHospitalized.insertOne(newInjuredHospitalized);

            res.sendStatus(201);
        }
    });
});


// POST /elements/:province

app.post("/api/v1/injured-hospitalized/:province", (req, res) => {

    res.sendStatus(405);
});


// DELETE 

app.delete("/api/v1/injured-hospitalized", (req, res) => {

    injuredHospitalized.remove({});

    res.sendStatus(200);
});


// GET /contacts/province

app.get("/api/v1/injured-hospitalized/:province", (req, res) => {

    var province = req.params.province;

    injuredHospitalized.find({ "province": province }).toArray((error, filtered) => {
        if (error) {
            console.log("Error:" + error);
        }


        //   var filtered = injuredHospitalized.filter((c) =>{
        //      return c.province == province; 
        //   })


        if (filtered.length >= 1) {
            res.send(filtered[0]);
        }
        else {
            res.sendStatus(404);
        }
    });
});


// PUT /contacts/sevilla


app.put("/api/v1/injured-hospitalized/:province", (req, res) => {

    var province = req.params.province;
    var newIH = req.body;
    var found = false;
    
    injuredHospitalized.find({ "province": province }).toArray((err, IHArray) => {
        
        if (err)
            console.log(err);

        if (IHArray == 0) {

            res.sendStatus(404);

        }
        else if (req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("accident") == false ||
            req.body.province != province) {

            res.sendStatus(400);

        }
        else {

            injuredHospitalized.updateOne({ "province": province }, { $set: newIH });
            res.sendStatus(200);
            console.log(newIH);
            

        }
    });
});


// PUT /injuredHospitalized/
app.put("/api/v1/injured-hospitalized/", (req, res) => {

    res.sendStatus(405);
});


// DELETE /injured-hospitalized/:province

app.delete("/api/v1/injured-hospitalized/:province", (req, res) => {

    var province = req.params.province;

    injuredHospitalized.find({ "province": province }).toArray((err, filtered) => {
        if (err) {
            console.log("Error: " + err);
        }
        if (filtered.length == 0) {
            res.sendStatus(404);
        }
        else {
            injuredHospitalized.deleteOne({ "province": province });
            res.sendStatus(200);
        }
    });



});


//====================================NO TOCAR===================================================
app.listen(port, () => {
    console.log("I'm ready on port " + port);

});