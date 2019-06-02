var app = angular.module("app");
app.controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

    console.log("Edit Controller initialized!");


    
    var API = "/api/v1/deceaseds";
    //var API = "https://sos1819-14.herokuapp.com/api/v1/deceaseds";
    var province = $routeParams.province;
    var year = $routeParams.year;



    $scope.data = "Disfrute de nuestra página";

    $http.get(API + "/" + province + "/" + year).then(function(response) {
        console.log("Data Recieved: " + JSON.stringify(response.data, null, 2));
        $scope.updatedDeceased = response.data;

    });

    $scope.updateDeceased = function() {
        console.log("Updating a new deceased");


        $http.put(API + "/" + province + "/" + year, $scope.updatedDeceased).then(function(response) {
            $scope.status = "Status: Registro modificado con éxito";
            console.log("POST Response " + response.status + "" + response.data);
            $location.path("/ui/v1/deceaseds");

        }, function() {
            if ($scope.updatedDeceased.life == null ||
                $scope.updatedDeceased.penalty == null ||
                $scope.updatedDeceased.number == null) {
                $scope.status = "Error: debe completar todos los campos"
            }
        });
    };
}]);
