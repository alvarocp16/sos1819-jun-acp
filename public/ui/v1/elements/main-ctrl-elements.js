/*global angular*/

var app = angular.module("MiniPostmanApp");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/elements";

    $scope.data = "Bienvenido";

    refresh(undefined, undefined);

    function refresh(limit,offset) {
        $scope.showInfoComp = false;
        console.log("Requesting competitions to <" + $scope.url + "?from=" + $scope.from + "&to=" + $scope.to + ">");
        let url = $scope.url +
            "?from=" + parseInt($scope.from) +
            "&to=" + parseInt($scope.to) +
            "&offset=" + parseInt($scope.offset) +
            "&limit=" + parseInt(limit);
        console.log(url);
        $http.get(url).then(function(response) {
            console.log("Data received: " + JSON.stringify(response.data, null, 2));
            $scope.elements = response.data;
            if (JSON.stringify(response.data, null, 2).length === 2) {
                $scope.showInfoComp = true;
            }
        }, function(response) {
            console.log("Data received: " + JSON.stringify(response.data, null, 2));
        });
    }
    $scope.search = function() {
        refresh(undefined, undefined);
    };
    var API = "/api/v1/elements";
    var pagina = 0;
    var numero;
    $scope.Pagination = function(num) {
        numero = num;
        if (num == 1) {
            pagina = pagina - 10;
            if (pagina < 0) {
                pagina = 0;
                $http.get(API + "?limit=" + 10 + "&offset=" + pagina).then(function(response) {
                    $scope.elements = response.data;
                    console.log("pagination1");
                    numero = num;
                    console.log(numero);
                });
            }
            else {
                $http.get(API + "?limit=" + 10 + "&offset=" + pagina).then(function(response) {
                    $scope.elements = response.data;
                    console.log("pagination2");
                    numero = num;
                    console.log(numero);
                });
            }
        }else{
            pagina = pagina + 10;
            $http.get(API + "?limit=" + 10 + "&offset=" + pagina).then(function(response) {
                $scope.elements = response.data;
                console.log("pagination3");
                numero = num;
                console.log(numero);
            });
        }
    };
    $scope.addElement = function() {
        var newElement = $scope.newElement;
        console.log("Adding a new Element: " + JSON.stringify(newElement, null, 2));
        $http.post($scope.url, newElement).then(function(response) {
            $scope.data = "Elemento creado correctamente!";
            console.log("POST Response: " + response.status + " " + response.data);
            refresh();
        }, function(error) {
            $scope.status = error.status;
            if ($scope.status == 400) {
                $scope.data = "Algún campo está mal";
            }
            else if ($scope.status == 409) {
                $scope.data = "El elemento que quiere añadir ya existe";
            }
        });
    };
    $scope.putElement = function(province, year, victims, injurednothospitalizedinaccidents, accidentswithvictims) {
        if (province != 'undefined' &&
            year != 'undefined' &&
            victims != 'undefined' &&
            injurednothospitalizedinaccidents != 'undefined' &&
            accidentswithvictims != 'undefined') {
            var data = {
                province: province,
                year: parseInt(year),
                victims: victims,
                injurednothospitalizedinaccidents: injurednothospitalizedinaccidents,
                accidentswithvictims: accidentswithvictims
            };
        }
        console.log("PUT a Element: " + JSON.stringify(data));
        $http.put($scope.url + "/" + province + "/" + year, JSON.stringify(data)).then(function(response) {
            $scope.data = "Elemento modificado correctamente!";
            console.log("PUT Response: " + response.status + " " + response.data);
            refresh();
        }, function(error) {
            $scope.status = error.status;
            if ($scope.status == 404) {
                $scope.data = "El elemento no se encuentra";
            }
            else if ($scope.status == 400) {
                $scope.data = "Algún campo está mal";
            }
        });
    };
    $scope.deleteElement = function(province, year) {
        console.log("Delete Element with province <" + province + "> and year <" + year + ">");
        $http.delete($scope.url + "/" + province + "/" + year).then(function(response) {
            $scope.data = "Elemento borrado!";
            console.log("DELETE Response: " + response.status + " " + response.data);
            refresh();
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };
    $scope.deleteElements = function() {
        console.log("Delete Elements");
        $http.delete($scope.url).then(function(response) {
            $scope.data = "Todos borrados!";
            console.log("DELETE Response: " + response.status + " " + response.data);
            refresh();
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };
    $scope.getLoadInitialData = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
                $scope.data = "Todos los elementos iniciales se han cargado correctamente";
                console.log("Data received: " + JSON.stringify(response.data, null, 2));
                $scope.elements = response.data;
                refresh();
            },
            function(error) {
                $scope.status = error.status;
                if ($scope.status == 409) {
                    $scope.data = "No debe haber elementos ningunos";
                }
            });
    };
    //De aquí para abajo no cuenta
    $scope.sendGet = function() {
        $http.get($scope.url).then(function(response) {
            var res = JSON.stringify(response.data, null, 2);
            $scope.dataResponse = res;
            $scope.stateCode = response.status;
        }, function(response) {
            $scope.dataResponse = response.status + ", " + response.statusText;
            $scope.stateCode = response.status;
        });
    };
    $scope.sendGetLoadInitialData = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            var res = JSON.stringify(response.data, null, 2);
            $scope.dataResponse = res;
            $scope.stateCode = response.status;
        }, function(response) {
            $scope.dataResponse = response.status + ", " + response.statusText;
            $scope.stateCode = response.status;
        });
    };
    $scope.sendPostParam = function(province, year, victims, injurednothospitalizedinaccidents, accidentswithvictims) {
        if (province != 'undefined' &&
            year != 'undefined' &&
            victims != 'undefined' &&
            injurednothospitalizedinaccidents != 'undefined' &&
            accidentswithvictims != 'undefined') {
            var data = {
                province: province,
                year: parseInt(year),
                victims: victims,
                injurednothospitalizedinaccidents: injurednothospitalizedinaccidents,
                accidentswithvictims: accidentswithvictims
            };
            $http.post($scope.url, JSON.stringify(data)).then(function(response) {
                $scope.dataResponse = JSON.stringify(response.data, null, 2);
                $scope.stateCode = response.status;
            }, function(response) {
                $scope.dataResponse = response.status + "\n" + response.statusText;
                $scope.stateCode = response.status;
            });
        }
        else {
            $scope.dataResponse = "Fields required";
        }
    };
    $scope.sendPost = function() {
        var element;
        if ($scope.dataResponse) {
            element = $scope.dataResponse;
        }
        else {
            element = {
                province: $scope.province,
                year: parseInt($scope.year),
                victims: $scope.victims,
                injurednothospitalizedinaccidents: $scope.injurednothospitalizedinaccidents,
                accidentswithvictims: $scope.accidentswithvictims
            };
        }
        $http.post($scope.url, element).then(function(response) {
            $scope.stateCode = response.status;
        }, function(error) {
            $scope.stateCode = error.status;
        });
    };
    $scope.sendPut = function(province, year, victims, injurednothospitalizedinaccidents, accidentswithvictims) {
        if (province != 'undefined' &&
            year != 'undefined' &&
            victims != 'undefined' &&
            injurednothospitalizedinaccidents != 'undefined' &&
            accidentswithvictims != 'undefined') {
            var data = {
                province: province,
                year: parseInt(year),
                victims: victims,
                injurednothospitalizedinaccidents: injurednothospitalizedinaccidents,
                accidentswithvictims: accidentswithvictims
            };
            $http.put($scope.url, JSON.stringify(data)).then(function(response) {
                $scope.dataResponse = JSON.stringify(response.data, null, 2);
                $scope.stateCode = response.status;
            }, function(response) {
                $scope.dataResponse = response.status + "\n" + response.statusText;
                $scope.stateCode = response.status;
            });
        }
        else {
            $scope.dataResponse = "Fields required";
        }
    };
    $scope.sendDelete = function() {
        $http.delete($scope.url).then(function(response) {
            var res = JSON.stringify(response.data, null, 2);
            $scope.dataResponse = res;
            $scope.stateCode = response.status;
        }, function(response) {
            $scope.dataResponse = response.status + ", " + response.statusText;
            $scope.stateCode = response.status;
        });
    };
}]);
