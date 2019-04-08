/*global angular*/

var app = angular.module("MiniPostmanApp")
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/elements";
    var path = "https://sos1819-14.herokuapp.com";

    $scope.send = function() {
        $http.get($scope.url).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    }
    $scope.sendGet = function() {
        $http.get(path + $scope.url).then(function(response) {
            var res = JSON.stringify(response.data, null, 2);
            $scope.dataResponse = res;
        }, function(response) {
            $scope.dataResponse = response.status + ", " + response.statusText;
        });
    }

    $scope.sendPost = function(province, year, victims) {
        if (typeof province !== 'undefined' &&
            typeof year !== 'undefined' &&
            typeof victims !== 'undefined') {

            var data = {
                province: province,
                year: parseInt(year),
                victims: victims
            };
            console.log($scope.url);
            console.log(data);
            $http.post(path + $scope.url, JSON.stringify(data)).then(function(response) {
                console.log("OK post method");
                $scope.dataResponse = JSON.stringify(response.data, null, 2);
            }, function(response) {
                console.log("Error post method: Code " + response.status + ", " + response.statusText);
                $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
            });
        }
        else {
            $scope.dataResponse = "Fields required";
        }
    }

    $scope.sendPut = function(province, year, victims) {
        if (typeof province !== 'undefined' &&
            typeof year !== 'undefined' &&
            typeof victims !== 'undefined') {

            var data = {
                province: province,
                year: parseInt(year),
                victims: victims
            };
            console.log($scope.url);
            console.log(data);
            $http.put(path + $scope.url, JSON.stringify(data)).then(function(response) {
                console.log("OK put method");
                $scope.dataResponse = JSON.stringify(response.data, null, 2);
            }, function(response) {
                console.log("Error PUT method: Code " + response.status + ", " + response.statusText);
                $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
            });
        }
        else {
            $scope.dataResponse = "Fields required";
        }
    }

    $scope.sendDelete = function() {
        $http.delete(path + $scope.url).then(function(response) {
            console.log($scope.url);
            var res = JSON.stringify(response.data, null, 2);
            $scope.dataResponse = res;
        }, function(response) {
            $scope.dataResponse = response.status + ", " + response.statusText
        });
    }
}]);
