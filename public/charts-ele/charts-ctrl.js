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
                                type: 'line'
                            },
                            title: {
                                text: 'Victimas por año y provincia'
                            },
                            subtitle: {
                                text: 'Source: /api/v1/elements'
                            },
                            xAxis: {
                                categories: response.data.map(function(d) { return d.province + " " + d.year })
                            },
                            yAxis: {
                                title: {
                                    text: 'Victimas Nº'
                                }
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
                                name: 'Victimas',
                                data: response.data.map(function(d) { return d.victims })
                            }]
                        });
                        // Google Geochart
                        $http.get(API).then(function(response) {
                            var i;
                            for (i = 0; i < response.data.length; i++) {
                                dato.push(response.data[i].victims);
                            }
                            var suma = 0;
                            for (i = 0; i < response.data.length; i++) {
                                suma = suma + dato[i];
                            }
                            google.charts.load('current', {
                                'packages': ['geochart'],
                                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                            });
                            google.charts.setOnLoadCallback(drawRegionsMap);

                            function drawRegionsMap() {
                                var data = google.visualization.arrayToDataTable([
                                    ['Country', 'Elements'],
                                    ['Spain', suma]
                                ]);
                                var options = {};
                                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
                                chart.draw(data, options);
                            }
                        });
                        // Graphosaurus Chart
                        $http.get(API).then(function(response) {
                            var itemsY = [];
                            var itemsV = [];
                            for (var i = 0; i < response.data.length; i++) {
                                itemsY.push(response.data[i].year);
                                itemsV.push(response.data[i].victims);
                            }
                            var items = [
                                {x: itemsY[0], y: itemsV[0]},
                                {x: itemsY[1], y: itemsV[1]},
                                {x: itemsY[2], y: itemsV[2]},
                                {x: itemsY[3], y: itemsV[3]},
                                {x: itemsY[4], y: itemsV[4]},
                                {x: itemsY[5], y: itemsV[5]}
                              ];    
                            console.log(items);
                            var container = document.getElementById('visualization');
                            var dataset = new vis.DataSet(items);
                            var options = {
                                start: 2013,
                                end: 2016
                            };
                            var graph2d = new vis.Graph2d(container, dataset, options);
                        });
                    });
                }
            }]);
