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
    
    
    $scope.sendPost = function(province,year,number,life,penalty){
        if(province!='undefined'
        && year!='undefined'
        && number!='undefined'
        && life!='undefined'
        && penalty!='undefined'){


            var data = {
                province:province,
                year: parseInt(year),
                number:number,
                life:life,
                penalty:penalty
            };
            console.log($scope.url);
            console.log(data);
            $http.post($scope.url, JSON.stringify(data)).then(function (response) {
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

    $scope.sendPut = function(id,year,day,month,name,sportcenter,schoolcenter,activity,lengthactivity,totaldistance,inscriptionprice,additionalinfo){
        if(typeof id!=='undefined'
        && typeof year!=='undefined'
        && typeof day!=='undefined'
        && typeof month!=='undefined'
        && typeof activity!=='undefined'
        && typeof lengthactivity!=='undefined'
        && typeof totaldistance!=='undefined'
        && typeof inscriptionprice!=='undefined'){
            if(typeof name==='undefined') name="";
            if(typeof sportcenter==='undefined') sportcenter="";
            if(typeof schoolcenter==='undefined') schoolcenter="";
            if(typeof activity==='undefined') activity="";
            if(typeof additionalinfo==='undefined') additionalinfo="";

            var data = {
                id: parseInt(id),
                year: parseInt(year),
                day: parseInt(day),
                month:parseInt(month),
                name:name,
                sportcenter:sportcenter,
                schoolcenter:schoolcenter,
                activity:activity,
                lengthactivity:parseInt(lengthactivity),
                totaldistance:parseInt(totaldistance),
                inscriptionprice:parseInt(inscriptionprice),
                additionalinfo:additionalinfo
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

    $scope.sendDel = function(){
        $http.delete($scope.url).then(function(response){
            console.log($scope.url);
            var res = JSON.stringify(response.data,null,2);
            if (response.data.length == 1){
                
            }
            $scope.dataResponse = res;
        }, function (response) {
            $scope.dataResponse=response.status+", "+response.statusText
        });
    }

}]);