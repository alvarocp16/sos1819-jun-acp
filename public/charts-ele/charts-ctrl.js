/*global angular google Highcharts vis*/
angular
    .module("app")
    .controller("ChartsEleCtrl", ["$scope", "$http", "$routeParams", "$location", "$rootScope", function($scope, $http, $routeParams, $location, $rootScope) {

        console.log("ChartsElementsCtrl loaded.");
        var API = "/api/v1/elements";
        var dato = [];

        refresh();

        function refresh() {
            $http.get(API).then(function(response) {
                    console.log(response.data);
                    Highcharts.chart('container', {
                        chart: {
                            type: 'area'
                        },
                        title: {
                            text: 'Numero de victimas'
                        },
                        xAxis: {
                            title: {
                                text: 'Provincias'
                            },
                            categories: response.data.map(function(d) { return d.province })
                        },
                        yAxis: {
                            title: {
                                text: 'Valores'
                            },
                            categories: response.data.map(function(d) { return d.victims })
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true
                                },
                                enableMouseTracking: false
                            }
                        },
                        series: [{
                            name: 'Data',
                            data: response.data.map(function(d) { return d.victims })

                        }]
                    });

                    // Google Geochart
                    $http.get(API).then(function(response) {
                        var i;
                        for (i = 0; i < response.data.length; i++) {
                            dato.push(response.data[i].victims);
                        }
                        google.charts.load('current', {
                            'packages': ['geochart'],
                            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                        });
                        google.charts.setOnLoadCallback(drawRegionsMap);

                        function drawRegionsMap() {
                            var data = google.visualization.arrayToDataTable([
                                ['Country', 'Elements'],
                                ['Spain', dato[0] + dato[1] + dato[2] + dato[3] + dato[4]]
                            ]);
                            var options = {};
                            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
                            chart.draw(data, options);
                        }
                    });

                    var datos = [];
                    $http.get(API).then(function(response) {
                        var i;
                        console.log(response.status);
                        for (i = 0; i < response.data.length; i++) {
                            datos.push({ x: response.data[i].year, y: response.data[i].accidentswithvictims});
                        }
                        console.log(datos);
                        /*var chart = new CanvasJS.Chart("chartContainer", {
                            animationEnabled: true,
                            zoomEnabled: true,
                            theme: "light2",
                            title: {
                                text: "Capitalization And Education Expense"
                            },
                            axisX: {
                                title: "",
                                suffix: "",
                                minimum: 0,
                                maximum: 100,
                                gridThickness: 1
                            },
                            axisY: {
                                title: "",
                                suffix: "",
                                minimum: 0,
                                maximum: 100,
                                gridThickness: 1

                            },
                            data: [{
                                type: "bubble",
                                toolTipContent: "<b>{name}</b><br/>Number: {x}  <br/> Lifes: {y} . <br/> Year: {z}",
                                dataPoints: datos
                            }]
                        });
                        chart.render();*/
                        var container = document.getElementById('visualization');
                        /*var items = [
                            { x: '2014-06-11', y: 10 },
                            { x: '2014-06-12', y: 25 },
                            { x: '2014-06-13', y: 30 },
                            { x: '2014-06-14', y: 10 },
                            { x: '2014-06-15', y: 15 },
                            { x: '2014-06-16', y: 30 }
                        ];*/
                        var dataset = new vis.DataSet(datos);
                       
                        var graph2d = new vis.Graph2d(container, dataset); 
                    });
                },
                function(response) {
                    $scope.dataResponse = response.status + ", " + response.statusText;
                });
        }
    }]);
