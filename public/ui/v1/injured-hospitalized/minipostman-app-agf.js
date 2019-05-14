/*global angular*/
angular.module("MiniPostmanApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "ListCtrl",
                templateUrl: "list-injured.html"
            })
            .when("/edit/:province/:year", {
                controller: "EditCtrl",
                templateUrl: "edit-injured.html"
            })
    });

console.log("MiniPostmanApp initialized!");
