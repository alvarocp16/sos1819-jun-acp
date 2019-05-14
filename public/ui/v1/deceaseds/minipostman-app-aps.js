/*global angular*/
angular.module("MiniPostmanApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/deceaseds", {
                controller: "ListCtrl",
                templateUrl: "list-deceaseds.html"
            })
            .when("/edit/:province/:year", {
                controller: "EditCtrl",
                templateUrl: "edit-deceaseds.html"
            })
    });

console.log("MiniPostmanApp initialized!");
