/*global angular*/

var app = angular.module("MiniPostmanApp")
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/elements";

    $scope.sendGet = function(){
        $http.get($scope.url).then(function(response){
            var res = JSON.stringify(response.data,null,2);
            $scope.dataResponse = res;
        }, function (response) {
            $scope.dataResponse=response.status+", "+response.statusText
        });
    };
    
    $scope.sendPost = function(province, year, victims, injurednothospitalizedinaccidents, accidentswithvictims) {
        if (province != 'undefined' &&
            year != 'undefined' &&
            victims != 'undefined'&&
            injurednothospitalizedinaccidents != 'undefined' &&
            accidentswithvictims != 'undefined') {


            var data = {
                province: province,
                year: parseInt(year),
                victims: victims,
                injurednothospitalizedinaccidents: injurednothospitalizedinaccidents,
                accidentswithvictims: accidentswithvictims
            };
            console.log($scope.url);
            console.log(data);
            $http.post($scope.url, JSON.stringify(data)).then(function(response) {
                console.log("OK post method");
                $scope.dataResponse = JSON.stringify(response.data, null, 2);
            }, function(response) {
                console.log("Error POST method: Code " + response.status + ", " + response.statusText);
                $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
            });
        }
        else {
            $scope.dataResponse = "Fields required";
        }
    }
    $scope.sendPut = function(province, year, victims, injurednothospitalizedinaccidents, accidentswithvictims){
        if(province != 'undefined' &&
            year != 'undefined' &&
            victims != 'undefined'&&
            injurednothospitalizedinaccidents != 'undefined' &&
            accidentswithvictims != 'undefined'){
            var data = {
                province: province,
                year: parseInt(year),
                victims: victims,
                injurednothospitalizedinaccidents: injurednothospitalizedinaccidents,
                accidentswithvictims: accidentswithvictims
            };
            console.log($scope.url);
            console.log(data);
            $http.put($scope.url, JSON.stringify(data)).then(function (response) {
                console.log("OK put method");
                $scope.dataResponse = JSON.stringify(response.data,null,2);
            }, function (response) {
                console.log("Error PUT method: Code "+response.status+", "+response.statusText);
                $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
            });
        }else{
            $scope.dataResponse="Fields required";
        }
    }
    $scope.sendDelete = function(){
        $http.delete($scope.url).then(function(response){
            console.log($scope.url);
            var res = JSON.stringify(response.data,null,2);
            $scope.dataResponse = res;
        }, function (response) {
            $scope.dataResponse=response.status+", "+response.statusText
        });
    }
}]);
