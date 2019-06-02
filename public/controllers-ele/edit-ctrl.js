/*global angular*/
var app = angular.module("app");
app.controller("EditCtrl-ele", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("Edit Controller initialized!");

    var API = "/api/v1/elements";
    //var API = "https://sos1819-14.herokuapp.com/api/v1/elements";
    var province = $routeParams.province;
    var year = $routeParams.year;

    $scope.data = "Bienvenido";

    console.log("Requesting element <" + API + "/" + province + "/" + year + ">...");
    $http.get(API + "/" + province + "/" + year).then(function(response) {
        console.log("Data Recieved: " + JSON.stringify(response.data, null, 2));
        $scope.element = response.data;
    });

    $scope.updatedElement = function() {
        console.log("Updating a new element");
        $http.put(API + "/" + province + "/" + year, $scope.updatedElement).then(function(response) {
            $scope.data = "Elemento modificado correctamente!";
            $scope.status = "Status: Registro modificado con éxito";
            console.log("PUT Response " + response.status + "" + response.data);
            $location.path("/ui/v1/elements");
        }, function() {
            if ($scope.updatedElement.victims == null ||
                $scope.updatedElement.injurednothospitalizedinaccidents == null ||
                $scope.updatedElement.accidentswithvictims == null) {
                $scope.status = "Error: debe completar todos los campos";
            }
        });
    };
    $scope.updateElement = function(province, year) {
        console.log("Updating element with province " + province + " and year " + year);
        $http.put(API + "/" + province + "/" + year, $scope.element)
            .then(function(response) {
                $scope.data = "Elemento modificado correctamente!";
                console.log("PUT Response: " + response.status + " " + response.data);
            }, function(error) {
                $scope.status = error.status;
                if ($scope.status == 400) {
                    $scope.data = "Algún campo está mal!";
                }
                else if ($scope.status == 409) {
                    $scope.data = "El elemento que quiere añadir ya existe";
                }
            });
        $location.path("/ui/v1/elements");
    };
}]);
