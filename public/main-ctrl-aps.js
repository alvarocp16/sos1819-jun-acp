/*global angular*/

var app = angular.module("MiniPostmanApp")
app.controller("MainCtrl", ["$scope","$http", function ($scope,$http){
                console.log("MainCtrl initialized!");
                
                //new
                //var path="https://sos1819-14.herokuapp.com";
                
                $scope.url = "/api/v1/deceaseds";
                
                /*$scope.send = function (){
                    $http.get($scope.url).then(function (response){
                        $scope.data = JSON.stringify(response.data,null,2);
                    });
                }*/
                
    $scope.sendGet = function(){
        $http.get($scope.url).then(function(response){
            var res = JSON.stringify(response.data,null,2);
            if (response.data.length == 0){
                
            }
            $scope.dataResponse = res;
        }, function (response) {
            $scope.dataResponse=response.status+", "+response.statusText
        });
    }
    
    
}]);