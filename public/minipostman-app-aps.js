/*global angular*/
angular.module("MiniPostmanApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "./index.html",
            })
            .when("/ui/v1/deceaseds/", {
                controller: "ListCtrl",
                templateUrl: "ui/v1/deceaseds/list-deceaseds.html"
            })
           .when("/ui/v1/deceaseds/edit/:province/:year", {
                controller: "EditCtrl",
                templateUrl: "ui/v1/deceaseds/edit-deceaseds.html"
            })
    });

console.log("MiniPostmanApp initialized!");
