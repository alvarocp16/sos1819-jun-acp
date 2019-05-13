/*global angular*/

var app = angular.module("MiniPostmanApp")
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    
    $scope.url = "/api/v1/injured-hospitalized";

    $scope.data = "Disfrute de nuestra página";

    refresh(undefined, undefined);
    
  
    
    //nuevo    
    function refresh(limit, offset) {
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
            $scope.injuredHospitalized = response.data;
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
    var API = "/api/v1/injured-hospitalized";
    var pagina = 0;
    var numero;
    $scope.Pagination = function(num) {
        numero = num;
        if (num == 1) {
            pagina = pagina - 10;
            if (pagina < 0) {
                pagina = 0;
                $http.get(API + "?limit=" + 10 + "&offset=" + pagina).then(function(response) {
                    $scope.injuredHospitalized = response.data;
                    console.log("pagination1");
                    numero = num;
                    console.log(numero);
                });
            }
            else {
                $http.get(API + "?limit=" + 10 + "&offset=" + pagina).then(function(response) {
                    $scope.injuredHospitalized = response.data;
                    console.log("pagination2");
                    numero = num;
                    console.log(numero);
                });
            }
        }else{
            pagina = pagina + 10;
            $http.get(API + "?limit=" + 10 + "&offset=" + pagina).then(function(response) {
                $scope.injuredHospitalized = response.data;
                console.log("pagination3");
                numero = num;
                console.log(numero);
            });
        }
    };
    
    $scope.addInjuredHospitalized = function() {
        var newInjuredHospitalized = $scope.newInjuredHospitalized;
        console.log("Adding a new injured hospitalized: " + JSON.stringify(newInjuredHospitalized, null, 2));
        $http.post($scope.url, newInjuredHospitalized).then(function(response) {
            $scope.data = "Dato creado correctamente";
            console.log("POST Response: " + response.status + " " + response.data);
            refresh();
        
    },
        function(error) {
            $scope.status = error.status;
            if($scope.status == 409){
                console.log("eto no vaaaaa compae");
                $scope.data = "La provincia y año que intenta crear ya existe";
            }
           
        });
    };
    
    $scope.putInjuredHospitalized = function(province, year, accident_with_victim, number_of_deceased, injured_hospitalized) {
        if (province != 'undefined' &&
            year != 'undefined' &&
            accident_with_victim != 'undefined' &&
            number_of_deceased != 'undefined' &&
            injured_hospitalized != 'undefined') {
            var data = {
                province: province,
                year: parseInt(year),
                accident_with_victim: accident_with_victim,
                number_of_deceased: number_of_deceased,
                injured_hospitalized: injured_hospitalized
            };
        };
        console.log("PUT a Injured hopitalized: " + JSON.stringify(data));
        $http.put($scope.url + "/" + province + "/" + year, JSON.stringify(data)).then(function(response) {
            $scope.data = "Dato modificado correctamente";
            console.log("PUT Response: " + response.status + " " + response.data);
            refresh();
        });
        
    };
    
    $scope.deleteInjuredHospitalized = function(province, year) {
            console.log("Delete InjuredHospitalized with province <" + province + "> and year <" + year + ">");
            $http.delete($scope.url + "/" + province + "/" + year).then(function(response) {
                $scope.data = "Campo borrado correctamente";
                console.log("DELETE Response: " + response.status + " " + response.data);
                refresh();
        },
        function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });    

    };
        
        
    $scope.deleteAllInjuredHospitalizeds = function() {
        console.log("Delete Injured Hospitalized");
        $http.delete($scope.url).then(function(response) {
            $scope.data = "Todos las datos han sido borradas correctamente";
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
            console.log("Data received: " + JSON.stringify(response.data, null, 2));
            $scope.injuredHospitalized = response.data;
            refresh();
       
    },
        function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };
    
    
      //----------------- lo anterior --------------------------------------------------------------------




    $scope.sendGet = function() {
        $http.get($scope.url).then(function(response) {
            var res = JSON.stringify(response.data, null, 2);

            $scope.dataResponse = res;
            $scope.stateCode = response.status;
        }, function(response) {
            $scope.dataResponse = response.status + ", " + response.statusText
            $scope.stateCode = response.status;

        });
    }

    $scope.sendPost = function(province, year, accident_with_victim, number_of_deceased, injured_hospitalized) {
        if (province != 'undefined' &&
            year != 'undefined' &&
            accident_with_victim != 'undefined' &&
            number_of_deceased != 'undefined' &&
            injured_hospitalized != 'undefined') {

            var data = {
                province: province,
                year: parseInt(year),
                accident_with_victim: accident_with_victim,
                number_of_deceased: number_of_deceased,
                injured_hospitalized: injured_hospitalized
            };
            console.log($scope.url);
            console.log(data);
            $http.post($scope.url, JSON.stringify(data)).then(function(response) {
                console.log("OK post method");
                $scope.dataResponse = JSON.stringify(response.data, null, 2);
                $scope.stateCode = response.status;
            }, function(response) {
                console.log("Error POST method: Code " + response.status + ", " + response.statusText);
                console.log("caaaaabron");
                $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
                $scope.stateCode = response.status;
            });
        }
        else {
            $scope.dataResponse = "Fields required";
        }
    }

    $scope.sendPut = function(province, year, accident_with_victim, number_of_deceased, injured_hospitalized){
        if(province != 'undefined' &&
            year != 'undefined' &&
            accident_with_victim != 'undefined' &&
            number_of_deceased != 'undefined' &&
            injured_hospitalized != 'undefined'){
           
             var data = {
                province: province,
                year: parseInt(year),
                accident_with_victim: accident_with_victim,
                number_of_deceased: number_of_deceased,
                injured_hospitalized: injured_hospitalized
            };
            console.log($scope.url);
            console.log(data);
            $http.put($scope.url, JSON.stringify(data)).then(function (response) {
                console.log("OK put method");
                $scope.dataResponse = JSON.stringify(response.data,null,2);
                $scope.stateCode = response.status;
            }, function (response) {
                console.log("Error PUT method: Code "+response.status+", "+response.statusText);
                $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                $scope.stateCode = response.status;
            });
        }else{
            $scope.dataResponse="Fields required";
        }
    }
    
    $scope.sendDel = function(){
        $http.delete($scope.url).then(function(response){
            console.log($scope.url);
            var res = JSON.stringify(response.data,null,2);
            if (response.data.length == 1){
                
            }
            $scope.dataResponse = res;
            $scope.stateCode = response.status;
        }, function (response) {
            $scope.dataResponse=response.status+", "+response.statusText;
            $scope.stateCode = response.status;
        });
        
    }

}]);