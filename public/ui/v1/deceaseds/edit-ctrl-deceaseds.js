/global angular/

var app = angular.module("MiniPostmanApp")
app.controller("EditCtrl",["$scope","$http", "$routeParams", "$location", function ($scope,$http,$routeParams,$location){
    
    console.log("Edit Controller initialized!");


    $scope.url = "/api/v1/deceaseds";
    var API = "/api/v1/deceaseds";
    //var API = "https://sos1819-14.herokuapp.com/api/v1/deceaseds";
    var province = $routeParams.province;
    var year = $routeParams.year;
    
    

    $scope.data = "Disfrute de nuestra página";

    $http.get(API+"/"+province+"/"+year).then(function (response){
                console.log("Data Recieved: "+ JSON.stringify(response.data,null,2));            
                $scope.updatedDeceased = response.data;
            
    });
    
    $scope.updateDeceased = function(){
            console.log("Updating a new deceased");
            
            
            $http.put(API+"/"+province+"/"+year, $scope.updatedDeceased).then(function (response){
                $scope.status= "Status: Registro modificado con éxito";
                console.log("POST Response "+ response.status + "" + response.data);            
               $location.path("/");
            
            }, function() {
                if ($scope.updatedDeceased.life== null ||
                    $scope.updatedDeceased.penalty == null ||
                    $scope.updatedDeceased.number == null) {
                    $scope.status = "Error: debe completar todos los campos"
                }
            });
        };
   
    
   /* $scope.updateDeceased = function(province, year) {
        var newDeceased = $scope.newDeceased;
        console.log("Updating deceased of province: " + province);
        $http.putDeceased($scope.url + "/" + province + "/" + year, $scope.deceaseds).then(function(response) {
                $scope.data = "Defuncion creada correctamente";
                console.log("POST Response: " + response.status + " " + response.data);
                refresh();

            },
            function(error) {
                $scope.status = error.status;
                if ($scope.status == 409) {
                    $scope.data = "La defunción que intenta crear ya existe";
                }
            });
    };
*/

    
    

}]);
