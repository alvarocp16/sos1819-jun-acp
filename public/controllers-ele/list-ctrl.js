/*global angular*/
var app = angular.module("app");
app.controller("ListCtrl-ele", ["$scope", "$http", function($scope, $http) {
    console.log("List Controller initialized!");
    var API = "https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations";
    var proxyAPI = "/proxyJMC";
    //https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations
    /*var limit = 10;
    var offset = 0;
    var paginacionString = "";*/
        
    refresh();

    function refresh() {
        console.log("Requesting earnings inter stats to <" + API + ">...");
        $http.get(API).then(function(response) {
            console.log("Data received: " + JSON.stringify(response.data, null, 2));
            $scope.elements = response.data;
        });
    }
    $scope.loadInitialData = function() {
        $http.get(API + "/" + "loadInitialData").then(function(response) {
            alert("Elementos iniciales cargados correctamente.");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.statusInfo = JSON.stringify(response.status, null, 2);
            refresh();
        }).catch(function(response) {
            $scope.statusInfo = JSON.stringify(response.status, null, 2);
            if (response.status == 409) {
                alert("Error: Los datos iniciales ya existen.");
            }
        });
    };
    $scope.addElement = function() {
        var newElement = $scope.newElement;
        console.log("Adding a new earning inter stat: " + JSON.stringify(newElement, null, 2));
        $http.post(API, newElement).then(function(response) {
            alert("El dato  " + JSON.stringify(newElement.province, null, 2) + " se ha añadido correctamente.");
            console.log("POST Response: " + response.status + " " + response.data);
            refresh();
        }, function(error) {
            if (error.status == 400) {
                alert("Error: Debe rellenar todos los campos.");
            }
            else if (error.status == 409) {
                alert("Error: El dato " + JSON.stringify(newElement.province, null, 2) + " ya existe.");
            }
        });
    };
    $scope.deleteElement = function(province) {
        console.log("Deleting elements with province: " + province);
        $http.delete(API + "/" + province).then(function(response) {
            alert("El dato se ha eliminado correctamente.");
            console.log("DELETE Response: " + response.status + " " + response.data);
            refresh();
        });
    };
    $scope.deleteOneElement = function(province, year) {
        console.log("Delete Element with province <" + province + "> and year <" + year + ">");
        $http.delete(API + "/" + province + "/" + year).then(function(response) {
            $scope.data = "Elemento borrado!";
            console.log("DELETE Response: " + response.status + " " + response.data);
            refresh();
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };
    $scope.deleteElements = function() {
        console.log("Deleting Elements");
        $http.delete(API).then(function(response) {
            alert("Todas los datos se han eliminado correctamente.");
            $scope.data = "";
            console.log("DELETE ALL Response: " + response.status + " " + response.data);
            refresh();
        });
    };
    $scope.busqueda = function() {
        console.log(API + "?" + $scope.atributo + "=" + $scope.valor);
        $http.get(API + "?" + $scope.atributo + "=" + $scope.valor).then(function(response) {
            if (response.data.length == 0) {
                alert("No se ha encontrado ninguna dato.");
            }
            else if (response.data.length == 1) {
                alert("Se ha encontrado 1 dato.");
            }
            else {
                alert("Se han encontrado " + response.data.length + " dato.");
            }
            $scope.elements = response.data;
            console.log("Búsqueda Response: " + response.status + " " + JSON.stringify(response.data, null, 2));
        });
    };
    /*$scope.paginacion = function() {
        console.log($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset);
        $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            alert("Paginación realizada correctamente.");
            $scope.elements = response.data;
            console.log("Paginación Response: " + response.status + " " + JSON.stringify(response.data, null, 2));
        });
    };
    
    $scope.paginaAnterior = function() {
        $scope.offset = $scope.offset - $scope.limit;
        $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.elements = response.data;
        });
    };
    $scope.paginaSiguiente = function() {
        $scope.offset = $scope.offset + $scope.limit;
        $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.elements = response.data;
            $scope.error = "";
        });
    }
    function getElements() {
        paginacionString = "&limit=" + limit + "&offset=" + offset;
        $http.get($scope.url + "?" + paginacionString).then(function(response) {
            console.log("Data received: " + JSON.stringify(response.data, null, 2));
            $scope.elements = response.data;
        });
    }
    getElements();
    $scope.siguientePag = function() {
        offset += limit;
        getElements();
    };
    $scope.anteriorPag = function() {
        if (offset < 0) {
            offset = 0;
        } else {
            offset -= limit;
        }
        getElements();
    };*/

}]);
