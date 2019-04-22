/*global angular*/

var app = angular.module("MiniPostmanApp");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/elements";

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
        $http.get($scope.url+"/loadInitialData").then(function(response) {
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
