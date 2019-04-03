var express = require("express");
var bodyParser = require("body-parser");

var path = require("path");

var app = express();

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//============ Antonio Perez ============
const uriaps = "mongodb+srv://antoniops96:ANpeso96@sos1819-14-aps-htbgq.mongodb.net/test?retryWrites=true";
const clientaps = new MongoClient(uriaps, { useNewUrlParser: true });

var deceasedsApi = require("./deceaseds-api");
var deceaseds;

clientaps.connect(err => {
    deceaseds = clientaps.db("sos1819-14-aps").collection("deceaseds");
    deceasedsApi.register(app, deceaseds);
    // perform actions on the collection object
    console.log("Connected!");
});


//=========================================================================== Chamorro ======================================
const uriacp = "mongodb+srv://test:test@sos-wje4l.mongodb.net/sos1819?retryWrites=true";
const clientacp = new MongoClient(uriacp, { useNewUrlParser: true });
var elementsApi = require("./elements-api");
//Conexion a la base de datos
var elements;
clientacp.connect(err => {
    elements = clientacp.db("sos1819").collection("elements");
    elementsApi.register(app, elements);
    console.log("Connected!");
});


// ======================================================== PETI =====================================================================
const uri = "mongodb+srv://test:test@sos-sb5wi.mongodb.net/sos1819?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });


var injuredHospitalizedApi = require("./injured-hospitalized-api");
var injuredHospitalized;

client.connect(err => {
    injuredHospitalized = client.db("sos1819").collection("injured-hospitalized");
    injuredHospitalizedApi.register(app, injuredHospitalized);
    console.log("Connected!");
});
//====================================NO TOCAR===================================================
app.listen(port, () => {
    console.log("I'm ready on port " + port);

});