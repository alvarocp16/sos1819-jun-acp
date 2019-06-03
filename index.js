var express = require("express");
var request = require("request");
var cors = require("cors");
var bodyParser = require("body-parser");
var elementsApi = require("./elements-api");

var injuredHospitalizedApi = require("./injured-hospitalized-api");
var deceasedsApi = require("./deceaseds-api");

var path = require("path");

var app = express();

app.use("/", express.static(__dirname + "/public"));


/*app.use("/app-aps", express.static(path.join(__dirname, "public/front-end-deceaseds.html")));
app.use("/app-agf", express.static(path.join(__dirname, "public/front-end-injured-hospitalized.html")));
app.use("/app-acp", express.static(path.join(__dirname, "public/front-end-elements.html")));*/

app.use('/ui/v1/deceaseds', express.static(path.join(__dirname, "public/views")));
app.use('/ui/v1/injured-hospitalized', express.static(path.join(__dirname, "public/views-inj")));


app.use(bodyParser.json());
app.use(cors());

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

//consumicion de API de Jesus Ezcurra con proxy

var paths='/proxy1';
var apiServerHost1 = 'https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings';

app.use("/proxy1", function(req, res) {
  //var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+ apiServerHost1);
  req.pipe(request(apiServerHost1)).pipe(res);
});

//consumicion de API de Maria Dolores Lopez


var paths='/proxy2';
var apiServerHost2 = 'https://sos1819-08.herokuapp.com/API/v1/tourists-by-countries';


app.use("/proxy2", function(req, res) {
  //var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+ apiServerHost2);
  req.pipe(request(apiServerHost2)).pipe(res);
});

//consumicion de API de Pablo Garcia

var paths='/proxy3';
var apiServerHost3 = 'https://sos1819-02.herokuapp.com/api/v1/companies-stats/';


app.use("/proxy3", function(req, res) {
  //var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+ apiServerHost3);
  req.pipe(request(apiServerHost3)).pipe(res);
});

//consumicion de API de Juan Pedro

var paths='/proxy4';
var apiServerHost4 = 'https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats';


app.use("/proxy4", function(req, res) {
  //var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+ apiServerHost4);
  req.pipe(request(apiServerHost4)).pipe(res);
});

//consumicion de API de Gauthier

var paths='/proxy5';
var apiServerHost5 = 'https://sos1819-09.herokuapp.com/api/v2/climate-stats/';


app.use("/proxy5", function(req, res) {
  //var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+ apiServerHost5);
  req.pipe(request(apiServerHost5)).pipe(res);
});


//consumicion de API de Antonio Jesus

var paths='/proxy6';
var apiServerHost6 = 'https://sos1819-11.herokuapp.com/api/v1/general-public-expenses/';


app.use("/proxy6", function(req, res) {
  //var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+ apiServerHost6);
  req.pipe(request(apiServerHost6)).pipe(res);
});

//integracion api externa
var paths ='/proxyExterno';
var apiServerHost7 = 'https://data.police.uk/api/crimes-street-dates';


app.use("/proxyExterno", function(req, res) {
  //var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+ apiServerHost7);
  req.pipe(request(apiServerHost7)).pipe(res);
});


//integracion api externa2
var paths ='/proxyExterno2';
var apiServerHost8 = 'https://restcountries.eu/rest/v2/all';


app.use("/proxyExterno2", function(req, res) {
  //var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+ apiServerHost8);
  req.pipe(request(apiServerHost8)).pipe(res);
});


//integracion api externa3
var paths ='/proxyExterno3';
var apiServerHost9 = 'https://api.jcdecaux.com/vls/v1/stations/?contract=Seville&apiKey=6fa39265431480ca0b5f3393cd78f29e2d436882';


app.use("/proxyExterno3", function(req, res) {
  //var url = apiServerHost + req.baseUrl + req.url;
  console.log('piped: '+ apiServerHost9);
  req.pipe(request(apiServerHost9)).pipe(res);
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