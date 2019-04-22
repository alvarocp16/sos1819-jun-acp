/*global angular*/

var app = angular.module("MiniPostmanApp");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/elements";

    $scope.data= "Bienvenido";
    refresh();
    function refresh() {
        console.log("Requesting elements to <" + $scope.url + ">....");
        $http.get($scope.url).then(function(response) {
            console.log("Data received: " + JSON.stringify(response.data, null, 2));
            $scope.elements = response.data;
        });
    }
    $scope.addElement = function() {
        var newElement = $scope.newElement;
        console.log("Adding a new Element: " + JSON.stringify(newElement, null, 2));
        $http.post($scope.url, newElement).then(function(response) {
            $scope.data = "Elemento creado!";
            console.log("POST Response: " + response.status + " " + response.data);
            refresh();
        },
        function(error) {
            $scope.status = error.status;
            if($scope.status == 409){
                $scope.data = "El elemento que intenta crear ya existe";
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
        };
        console.log("PUT a Element: " + JSON.stringify(data));
        $http.put($scope.url + "/" + province + "/" + year, JSON.stringify(data)).then(function(response) {
            console.log("PUT Response: " + response.status + " " + response.data);
            refresh();
        });
    };
    $scope.deleteElement = function(province, year) {
        console.log("Delete Element with province <" + province + "> and year <" + year + ">");
        $http.delete($scope.url + "/" + province + "/" + year).then(function(response) {
            $scope.data = "Elemento borrado!";
            console.log("DELETE Response: " + response.status + " " + response.data);
            refresh();
        },function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };
    $scope.deleteElements = function() {
        console.log("Delete Elements");
        $http.delete($scope.url).then(function(response) {
            console.log("DELETE Response: " + response.status + " " + response.data);
            refresh();
        },function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };
    $scope.getLoadInitialData = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            console.log("Data received: " + JSON.stringify(response.data, null, 2));
            $scope.elements = response.data;
            refresh();
        },
        function(error) {
            $scope.status = error.status;
            if($scope.status == 409){
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
