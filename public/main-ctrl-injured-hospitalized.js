/*global angular*/

var app = angular.module("MiniPostmanApp")
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    
    $scope.url = "/api/v1/injured-hospitalized";



    refresh();
    $scope.data = "Disfrute de nuestra página";
   
   
   //nuevo
    var search = "?";
    var limit = 5;
    var offset = 0;
    var paginationString = "";
    $scope.currentPage = 1;
    
    
    
    //nuevo    
    function refresh() {
    //nuevo
     
    //nuevo   
        
        
       
        console.log("Requesting Injured Hospitalized to <" + $scope.url + ">....");
        $http.get($scope.url, search, paginationString).then(function(response) {
            console.log("Data received: " + JSON.stringify(response.data, null, 2));
            $scope.injuredHospitalized = response.data;
            
            $scope.previousPage = function() {
                     if ($scope.currentPage > 1) {
                     offset -= limit;
                     refresh();
                     $scope.currentPage -= 1;
                    }
                 };
            
            $scope.busqueda = function() {
                    if ($scope.searchForm.pronvince) {
                    search += ("&province=" + $scope.injuredHospitalized.province);
                    }
                    if ($scope.searchForm.year) {
                    search += ("&year=" + $scope.injuredHospitalized.year);
                    }
                    console.log(search);
                    refresh();
                    search="?";
            };  
            
            $scope.nextPage = function() {
                     if ($scope.injuredHospitalized.length == limit) {
                    offset += limit;
                    refresh();
                    $scope.currentPage += 1;
                    }
                    };
                    }, 
                    function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
    }
    
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
        console.log("PUT a Element: " + JSON.stringify(data));
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

