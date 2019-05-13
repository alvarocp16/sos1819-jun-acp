/*global angular*/
angular.module("MiniPostmanApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "ListCtrl",
                templateUrl: "list-deceaseds.html"
            })
            .when("/edit", {
                controller: "EditCtrl",
                templateUrl: "edit-deceaseds.html"
            })
    });

console.log("MiniPostmanApp initialized!");
