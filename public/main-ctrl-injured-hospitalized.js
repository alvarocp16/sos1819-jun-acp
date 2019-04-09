/global angular/

var app = angular.module("MiniPostmanApp")
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/injured-hospitalized";

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

