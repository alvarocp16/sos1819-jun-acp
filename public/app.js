/* global angular */

angular
    .module("app", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider.
        when("/", {
            templateUrl: "info.html"
        }).
        when("/integrations", {
            templateUrl: "info-integrations.html"
        }).
        when("/ui/v1/deceaseds", {
            controller: "ListCtrl",
            templateUrl: "/views/list.html"
        }).
        when("/ui/v1/deceaseds/edit/:province/:year", {
            controller: "EditCtrl",
            templateUrl: "/views/edit.html"
        }).
        when("/charts/v1/deceaseds/", {
            controller: "ChartsCtrl",
            templateUrl: "/charts/charts.html"
        }).
        when("/integrations/v1/deceaseds/", {
            controller: "IntegrationsCtrl",
            templateUrl: "/integrations/integrations.html"

   //___________________ Antonio García ________________         
          
            
        }).when("/ui/v1/injured-hospitalized", {
            controller: "ListCtrl-inj",
            templateUrl: "/views-inj/list.html"
        }).
        when("/ui/v1/injured-hospitalized/edit/:province/:year", {
            controller: "EditCtrl-inj",
            templateUrl: "/views-inj/edit.html"
            
    //___________________ Alvaro ________________         
    
        }).when("/ui/v1/elements", {
            controller: "ListCtrl-ele",
            templateUrl: "/views-ele/list.html"
        }).
        when("/ui/v1/elements/edit/:province/:year", {
            controller: "EditCtrl-ele",
            templateUrl: "/views-ele/edit.html"
            
        });
    });

console.log("Contacts App Initialized.");