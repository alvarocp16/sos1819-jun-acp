var express = require("express");

var bodyParser = require("body-parser");

var path = require("path");



var app = express();

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "/api/v1/YYYYYY")));


var port = process.env.PORT || 8080;

//============ Antonio Perez ============
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
    
    deceaseds.find({}).toArray((err, deceasedsArray) =>{
        if(err){
            console.log("Error" +err);
        }
        res.send(deceasedsArray);
    });

});

//GET /api/v1/YYYYYY/loadInitialData

app.get("/api/v1/deceaseds/loadInitialData", (req, res) => {

    
    var newDeceased = [
    {province: "Badajoz",
    number: "60",
    year: "2015"},
    
    {province: "Huelva",
    number: "20",
    year: "2015"},
    
    {province: "Seville",
    number: "10",
    year: "2015"},
    
    {province: "Madrid",
    number: "40",
    year: "2015"},
    
    {province: "Huelva",
    number: "10",
    year: "2015"}
    
    
    ];
    
    
    newDeceased.forEach((i) => {
        deceaseds.push(i);
    })
   

    res.sendStatus(201);
});


//POST /deceaseds/
app.post("/api/v1/deceaseds", (req, res) => {

    var newDeceased = req.body;
    
    deceaseds.insert(newDeceased);

    res.sendStatus(201);
});

//POST /deceaseds/Alava
app.post("/api/v1/deceaseds/:province", (req, res) => {

    res.sendStatus(405);
});


//DELETE /deceaseds/

app.delete("/api/v1/deceaseds", (req, res) => {

    deceaseds = [];

    res.sendStatus(200);
});

//GET /deceaseds/albacete

app.get("/api/v1/deceaseds/:province", (req, res) => {

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

app.put("/api/v1/deceaseds/:province", (req, res) => {

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

app.put("/api/v1/deceaseds/", (req, res) => {

    res.sendStatus(405);
});


//DELETE /deceaseds/petr

app.delete("/api/v1/deceaseds/:province", (req, res) => {

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

//============ Chamorro ========

var elements = [{
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
}];

// GET /elements/

app.get("/api/v1/elements", (req,res)=>{
    res.send(elements);
});

//GET /api/v1/YYYYYY/loadInitialData

app.get("/api/v1/elements/loadInitialData", (req, res) => {

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
});



// POST /elements/

app.post("/api/v1/elements", (req,res)=>{
    
    var newElement = req.body;
    
    elements.push(newElement);
    
    res.sendStatus(201);
});

// POST /elements/:province

app.post("/api/v1/elements/:province", (req,res)=>{
    
    res.sendStatus(405);
});


// DELETE /elements/

app.delete("/api/v1/elements", (req,res)=>{
    
    elements =  [];

    res.sendStatus(200);
});


// GET /elements/sevilla

app.get("/api/v1/elements/:province", (req,res)=>{

    var province = req.params.province;

    var filteredElements = elements.filter((c) =>{
       return c.province == province; 
    })
    
    if (filteredElements.length >= 1){
        res.send(filteredElements[0]);
    }else{
        res.sendStatus(404);
    }

});


// PUT /elements/sevilla

app.put("/api/v1/elements/:province", (req,res)=>{

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

});


// PUT /elements/
app.put("/api/v1/elements", (req,res)=>{
    
    res.sendStatus(405);
});


// DELETE /elements/seville

app.delete("/api/v1/elements/:province", (req,res)=>{

    var province = req.params.province;
    var found = false;

    var updatedElements = elements.filter((c) =>{
        
            if(c.province == province)  
                found = true;
        
            return c.province != province;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        elements = updatedElements;
        res.sendStatus(200);
    }

});


// ============= PETI ============
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
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@sos-sb5wi.mongodb.net/sos?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var injuredHospitalized; 

client.connect(err => {
   injuredHospitalized = client.db("sos1819").collection("injured-hospitalized");
  console.log("Connected!");
});

//loadInitialData

app.get("/api/v1/injured-hospitalized/loadInitialData", (req, res) => {

    
    var injHospitalized = [
    {province: "Badajoz",
    number: "3112",
    year: "2015"},
    {province: "Huelva",
    number: "254",
    year: "2015"},
    
    {province: "Seville",
    number: "6586",
    year: "2015"},
    
    {province: "Madrid",
    number: "8888",
    year: "2015"},
    
    {province: "Huelva",
    number: "7655",
    year: "2015"}
    
    
    ];
    
    injuredHospitalized.find({}).toArray((error, injuredHospitalizedArray) => {
        if (injuredHospitalizedArray.length == 0){
            injuredHospitalized.insert(injHospitalized);
            res.send(201)
        }else{
            res.send(409);
        }
    });
});

// GET /province/

app.get("/api/v1/injured-hospitalized", (req, res) => {
    
    injuredHospitalized.find({}).toArray((err, injuredHospitalizedArray) =>{
        if(err){
            console.log("Error" +err);
        }
        res.send(injuredHospitalizedArray);
    });

});


// POST /injured-hospitalized/

app.post("/api/v1/injured-hospitalized", (req,res)=>{
    var newInjuredHospitalized = req.body;
    injuredHospitalized.insert(newInjuredHospitalized);
    res.send(201);
});

        
    /*
    var newInjuredHospitalized = req.body;
    
    injuredHospitalized.push(newInjuredHospitalized)
    
    res.sendStatus(201);
    */


// POST /injuredHospitalized/seville
app.post("/api/v1/injured-hospitalized/:province", (req,res)=>{
    
    res.sendStatus(405);
});


// DELETE /province/

app.delete("/api/v1/injured-hospitalized", (req,res)=>{
    
    injuredHospitalized =  [];

    res.sendStatus(200);
});


// GET /contacts/province

app.get("/api/v1/injured-hospitalized/:province", (req,res)=>{

    var province = req.params.province;

    var filtered = injuredHospitalized.filter((c) =>{
       return c.province == province; 
    })
    
    if (filtered.length >= 1){
        res.send(filtered[0]);
    }else{
        res.sendStatus(404);
    }

});


// PUT /contacts/sevilla

app.put("/api/v1/injured-hospitalized/:province", (req,res)=>{

    var province = req.params.province;
    var updatedInjuredHospitalized = req.body;
    var found = false;

    var updatedInjuredHospitalized = injuredHospitalized.map((c) =>{
    
        if(c.province == province){
            found = true;
            return updatedInjuredHospitalized;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        injuredHospitalized = updatedInjuredHospitalized;
        res.sendStatus(200);
    }

});

// PUT /injuredHospitalized/
app.put("/api/v1/injured-hospitalized/", (req,res)=>{
    
    res.sendStatus(405);
});


// DELETE /contacts/peter

app.delete("/api/v1/injured-hospitalized/:province", (req,res)=>{

    var province = req.params.province;
    var found = false;

    var updatedInjuredHospitalized = injuredHospitalized.filter((c) =>{
        
            if(c.province == province)  
                found = true;
        
            return c.province != province;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        injuredHospitalized = updatedInjuredHospitalized;
        res.sendStatus(200);
    }

});

app.listen(port, () => {
    console.log("I'm ready on port " + port);

});