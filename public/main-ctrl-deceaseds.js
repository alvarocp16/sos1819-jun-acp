/global angular/

var app = angular.module("MiniPostmanApp")
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");

    //new
    //var path="https://sos1819-14.herokuapp.com";

    $scope.url = "/api/v1/deceaseds";

    /*$scope.send = function (){
        $http.get($scope.url).then(function (response){
            $scope.data = JSON.stringify(response.data,null,2);
        });
    }*/

    refresh();
    $scope.data = "Disfrute de nuestra página";

    function refresh() {
        console.log("Requesting deceaseds to <" + $scope.url + ">....");
        $http.get($scope.url).then(function(response) {
            console.log("Data received: " + JSON.stringify(response.data, null, 2));

            $scope.deceaseds = response.data;
        });
    }
    
    $scope.addDeceased = function() {
        var newDeceased = $scope.newDeceased;
        console.log("Adding a new Deceased: " + JSON.stringify(newDeceased, null, 2));
        $http.post($scope.url, newDeceased).then(function(response) {
            $scope.data = "Defuncion creada correctamente";
            console.log("POST Response: " + response.status + " " + response.data);
            refresh();
        
    },
        function(error) {
            $scope.status = error.status;
            if($scope.status == 409){
                $scope.data = "La defunción que intenta crear ya existe";
            }
        });
    };
    
    
    $scope.deleteDeceased = function(province, year) {
            console.log("Delete Deceased with province <" + province + "> and year <" + year + ">");
            $http.delete($scope.url + "/" + province + "/" + year).then(function(response) {
                $scope.data = "Defuncion borrada correctamente";
                console.log("DELETE Response: " + response.status + " " + response.data);
                refresh();
            
        },
        function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };
        
        
    $scope.deleteDeceaseds = function() {
        console.log("Delete Deceaseds");
        $http.delete($scope.url).then(function(response) {
            $scope.data = "Todas las defunciones han sido borradas correctamente";
            console.log("DELETE Response: " + response.status + " " + response.data);
            refresh();
        
    },
        function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };


    $scope.getLoadInitialData = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
             $scope.data = "Los datos iniciales se han cargado correctamente";
            console.log("Data received: " + JSON.stringify(response.data, null, 2));
            $scope.deceaseds = response.data;
            refresh();
        
    },
        function(error) {
            $scope.status = error.status;
            if($scope.status == 409){
                $scope.data = "Para cargar los datos iniciales no puede exister ningún elemento";
            }
        });
    };
    
      // lo anterior --------------------------------------------------------------------

    $scope.sendGet = function() {
        $http.get($scope.url).then(function(response) {
            var res = JSON.stringify(response.data, null, 2);
            //if (response.data.length == 0) {
            // }
            $scope.dataResponse = res;
            $scope.stateCode = response.status;
        }, function(response) {
            $scope.dataResponse = response.status + ", " + response.statusText;
            $scope.stateCode = response.status;
        });
    };



    $scope.sendPost = function(province, year, number, life, penalty) {
        if (province != 'undefined' &&
            year != 'undefined' &&
            number != 'undefined' &&
            life != 'undefined' &&
            penalty != 'undefined') {


            var data = {
                province: province,
                year: parseInt(year),
                number: number,
                life: life,
                penalty: penalty
            };
            console.log($scope.url);
            console.log(data);
            $http.post($scope.url, JSON.stringify(data)).then(function(response) {
                console.log("OK post method");
                $scope.dataResponse = JSON.stringify(response.data, null, 2);
                $scope.stateCode = response.status;
            }, function(response) {
                console.log("Error POST method: Code " + response.status + ", " + response.statusText);
                $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
                $scope.stateCode = response.status;
            });
        }
        else {
            $scope.dataResponse = "Fields required";
        }
    };

    $scope.sendPut = function(province, year, number, life, penalty) {
        if (province != 'undefined' &&
            year != 'undefined' &&
            number != 'undefined' &&
            life != 'undefined' &&
            penalty != 'undefined') {

            var data = {
                province: province,
                year: parseInt(year),
                number: number,
                life: life,
                penalty: penalty
            };
            console.log($scope.url);
            console.log(data);
            $http.put($scope.url, JSON.stringify(data)).then(function(response) {
                console.log("OK put method");
                $scope.dataResponse = JSON.stringify(response.data, null, 2);
                $scope.stateCode = response.status;
            }, function(response) {
                console.log("Error PUT method: Code " + response.status + ", " + response.statusText);
                $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
                $scope.stateCode = response.status;
            });
        }
        else {
            $scope.dataResponse = "Fields required";
        }
    };

    $scope.sendDel = function() {
        $http.delete($scope.url).then(function(response) {
            console.log($scope.url);
            var res = JSON.stringify(response.data, null, 2);
            if (response.data.length == 1) {

            }
            $scope.dataResponse = res;
            $scope.stateCode = response.status;
        }, function(response) {
            $scope.dataResponse = response.status + ", " + response.statusText;
            $scope.stateCode = response.status;
        });
    };

}]);
