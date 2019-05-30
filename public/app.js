/* global angular */

angular
    .module("app", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider.
        when("/", {
            templateUrl: "info.html",

        }).
        when("/ui/v1/deceaseds", {
            controller: "ListCtrl",
            templateUrl: "/views/list.html"
        }).
        when("/ui/v1/deceaseds/edit/:province/:year", {
            controller: "EditCtrl",
            templateUrl: "/views/edit.html"
            
   //___________________ Antonio García ________________         
          
            
        }).when("/ui/v1/injured-hospitalized", {
            controller: "ListCtrl-inj",
            templateUrl: "/views-inj/list.html"
        }).
        when("/ui/v1/injured-hospitalized/edit/:province/:year", {
            controller: "EditCtrl-inj",
            templateUrl: "/views-inj/edit.html"
            
        });
        

    });

console.log("Contacts App Initialized.");