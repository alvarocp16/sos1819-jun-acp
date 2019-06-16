/*global angular google Highcharts anychart Chart Morris am4core am4charts am4themes_kelly am4themes_animated*/
var app = angular.module("app");

app.controller("IntegrationsEleCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("IntegrationsElementsCtrl initicialized!");
    var myApi = "https://sos1819-14.herokuapp.com/api/v1/elements";
    var api0 = "/proxyDeceased";
    var api1 = "/proxySuicide";
    var api2 = "/proxyMovies";
    var api3 = "/proxyCountry";
    var api4 = "/proxyUefa";
    var api5 = "/proxyEconomy";
    var api6 = "/proxyPublic";
    var api7 = "/proxyYouth";
    var api8 = "/proxyEducation";
    var apiExterna1 = "/proxyExt1";
    var apiExterna2 = "/proxyExt2";
    var apiExterna3 = "/proxyExt3";
    //1-------------------API grupo 14 Deceaseds---------------------------------
    $http.get(api0).then(function(responseApi1) {
        $http.get(myApi).then(function(response) {
        });
    });
    //1-------------------API grupo 4 SUICIDE RATES---------------------------------
    $http.get(api1).then(function(responseApi1) {
        $http.get(myApi).then(function(response) {
        });
    });
    //2-------------------API grupo 2 Movies stats---------------------------------
    $http.get(api2).then(function(response) {
    });
    //3-------------------API grupo 3 country stats---------------------------------
    $http.get(api3).then(function(response2) {
        $http.get(myApi).then(function(response) {
        });
    });
    //4-------------------API grupo 6 Uefa-country-rankings---------------------------------
    $http.get(api4).then(function(response1) {
        $http.get(myApi).then(function(response) {
        });
    });
    //5-------------------INTEGRACION grupo 9 Economy-stats  ---------------------------------
    $http.get(myApi).then(function(response) {
        $http.get(api5).then(function(response2) {
        });
    });
    //6-------------------INTEGRACION grupo 11 Public-expenditure-educations ---------------------------------
    $http.get(api6).then(function(response) {
        $http.get(myApi).then(function(response2) {
        });
    });
    //5-------------------INTEGRACION grupo 12 Youth-unemployment-stats   ---------------------------------
    $http.get(myApi).then(function(response) {
        $http.get(api7).then(function(response2) {
        });
    });
    //6-------------------INTEGRACION grupo 15 educations-centers ---------------------------------
    $http.get(api8).then(function(response) {
        $http.get(myApi).then(function(response2) {
        });
    });
    //7-INTEGRACION CON API EXTERNA 1
    $http.get(apiExterna1).then(function(response) {
        $http.get(myApi).then(function(response2) {
        });
    });
    //8-INTEGRACION CON API EXTERNA 2
    $http.get(apiExterna2).then(function(response) {
        $http.get(myApi).then(function(response1) {
        });
    });
    //9-INTEGRACION CON API EXTERNA 3
    $http.get(apiExterna3).then(function(response) {
        $http.get(myApi).then(function(response1) {
        });
    });
}]);
