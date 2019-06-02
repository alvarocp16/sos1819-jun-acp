var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var elementsApi = require("./elements-api");
var injuredHospitalizedApi = require("./injured-hospitalized-api");
var deceasedsApi = require("./deceaseds-api");
var cors = require("cors");
var path = require("path");

var app = express();
app.use(cors());
app.use("/", express.static(__dirname + "/public"));


/*app.use("/app-aps", express.static(path.join(__dirname, "public/front-end-deceaseds.html")));
app.use("/app-agf", express.static(path.join(__dirname, "public/front-end-injured-hospitalized.html")));
app.use("/app-acp", express.static(path.join(__dirname, "public/front-end-elements.html")));*/

app.use('/ui/v1/deceaseds', express.static(path.join(__dirname, "public/views")));
app.use('/ui/v1/elements', express.static(path.join(__dirname, "public/views-ele")));
app.use('/ui/v1/injured-hospitalized', express.static(path.join(__dirname, "public/views-inj")));


app.use(bodyParser.json());

//Nuevo
//============ Integración grupo 4 SUICIDE RATES ============
var pathSuicide="/proxySuicide";
var remoteAPISuicide="https://sos1819-04.herokuapp.com/api/v1/suicide-rates";
app.use(pathSuicide, function(req, res) {
  console.log('piped: '+remoteAPISuicide);
  req.pipe(request(remoteAPISuicide)).pipe(res);
});
//============ Integración grupo 2 Movies stats ============
var pathMovies="/proxyMovies";
var remoteAPIMovies="https://sos1819-02.herokuapp.com/api/v1/movies-stats";
app.use(pathSuicide, function(req, res) {
  console.log('piped: '+remoteAPIMovies);
  req.pipe(request(remoteAPIMovies)).pipe(res);
});
//============ Integración grupo 3 country stats ============
var pathCountry="/proxyCountry";
var remoteAPICountry="https://sos1819-03.herokuapp.com/api/v1/country-stats";
app.use(pathCountry, function(req, res) {
  console.log('piped: '+remoteAPICountry);
  req.pipe(request(remoteAPICountry)).pipe(res);
});
//============ Integración grupo 6 Uefa-country-rankings ============
var pathUefa="/proxyUefa";
var remoteAPIUefa="https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings";
app.use(pathUefa, function(req, res) {
  console.log('piped: '+remoteAPIUefa);
  req.pipe(request(remoteAPIUefa)).pipe(res);
});
//============ Integración grupo 9 Economy-stats ============
var pathEconomy="/proxyEconomy";
var remoteAPIEconomy="https://sos1819-09.herokuapp.com/api/v1/economy-stats";
app.use(pathEconomy, function(req, res) {
  console.log('piped: '+remoteAPIEconomy);
  req.pipe(request(remoteAPIEconomy)).pipe(res);
});
//============ Integración grupo 11 Public-expenditure-educations ============
var pathPublic="/proxyPublic";
var remoteAPIPublic="https://sos1819-11.herokuapp.com/api/v1/public-expenditure-educations";
app.use(pathPublic, function(req, res) {
  console.log('piped: '+remoteAPIPublic);
  req.pipe(request(remoteAPIPublic)).pipe(res);
});
//============ Integración grupo 12 Youth-unemployment-stats ============
var pathYouth="/proxyYouth";
var remoteAPIYouth="https://sos1819-12.herokuapp.com/api/v1/youth-unemployment-stats";
app.use(pathYouth, function(req, res) {
  console.log('piped: '+remoteAPIYouth);
  req.pipe(request(remoteAPIYouth)).pipe(res);
});
//============ Integración grupo 15 educations-centers ============
var pathEducation="/proxyEducation";
var remoteAPIEducation="https://sos1819-15.herokuapp.com/api/v1/educations-centers";
app.use(pathEducation, function(req, res) {
  console.log('piped: '+remoteAPIEducation);
  req.pipe(request(remoteAPIEducation)).pipe(res);
});
//


var port = process.env.PORT || 8080;
const MongoClient = require("mongodb").MongoClient;
//============ Antonio Perez ============
const uriaps = "mongodb+srv://antoniops96:ANpeso96@sos1819-14-aps-htbgq.mongodb.net/test?retryWrites=true";
const clientaps = new MongoClient(uriaps, { useNewUrlParser: true });


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