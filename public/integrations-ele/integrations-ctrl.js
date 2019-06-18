/*global angular google Highcharts anychart Chart Morris am4core am4charts am4themes_kelly am4themes_animated*/
var app = angular.module("app");

app.controller("IntegrationsEleCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("IntegrationsElementsCtrl initicialized!");
    var myApi = "https://sos1819-jun-acp.herokuapp.com/api/v1/elements";
    var api1 = "/proxySuicide";
    var api2 = "/proxyMovies";
    var api3 = "/proxyCountry";
    var api4 = "/proxyUefa";
    var apiExterna1 = "/proxyExt1";
    var apiExterna2 = "/proxyExt2";

    var datoAux = [];
    var datoAux2 = [];
    var datoAux3 = [];

    //1-------------------API grupo 4 SUICIDE RATES---------------------------------
    $http.get(api1).then(function(responseApi1) {
        $http.get(myApi).then(function(response) {
            var i;
            for (i = 0; i < responseApi1.data.length; i++) {
                datoAux2.push(responseApi1.data[i].rank);
                datoAux3.push(responseApi1.data[i].year);
            }
            for (i = 0; i < response.data.length; i++) {
                datoAux.push(response.data[i].province);
            }
            Highcharts.chart('container', {
                chart: {
                    type: 'scatter'
                },
                title: {
                    text: "Integration: Suicide-Rates"
                },
                xAxis: {
                    categories: [
                        [datoAux[0], datoAux3[0]],
                        [datoAux[1], datoAux3[1]],
                        [datoAux[2], datoAux3[2]],
                        [datoAux[3], datoAux3[3]],
                        [datoAux[4], datoAux3[4]]
                    ],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Ranks',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' rank'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Total Ranks',
                    data: [datoAux2[0], datoAux2[1], datoAux2[2], datoAux2[3], datoAux2[4]]
                }]
            });
        });

        //2-------------------API grupo 2 Movies stats---------------------------------
        $http.get(api2).then(function(responseApi1) {
            $http.get(myApi).then(function(response) {
                var datoAux = [];
                var datoAux2 = [];
                var datoAux3 = [];
                var i;
                for (i = 0; i < responseApi1.data.length; i++) {
                    datoAux2.push(responseApi1.data[i].movienomination);
                    datoAux3.push(responseApi1.data[i].year);
                }
                for (i = 0; i < response.data.length; i++) {
                    datoAux.push(response.data[i].province);
                }
                Highcharts.chart('regions-div', {
                    chart: {
                        type: 'scatter'
                    },
                    title: {
                        text: "Integration: Movies-Stats"
                    },
                    xAxis: {
                        categories: [
                            [datoAux[0], datoAux3[0]],
                            [datoAux[1], datoAux3[1]],
                            [datoAux[2], datoAux3[2]],
                            [datoAux[3], datoAux3[3]],
                            [datoAux[4], datoAux3[4]]
                        ],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Movies Nomination',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' Movies Nomination'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Total Movies Nomination',
                        data: [datoAux2[0], datoAux2[1], datoAux2[2], datoAux2[3], datoAux2[4]]
                    }]
                });
            });

            //3-------------------API grupo 3 country stats---------------------------------
            $http.get(api3).then(function(response1) {
                $http.get(myApi).then(function(response) {
                    anychart.onDocumentReady(function() {
                        // create pie chart with passed data
                        var chart = anychart.pie([
                            [response.data[0].province, response1.data[0].population],
                            [response.data[1].province, response1.data[1].population],
                            [response.data[2].province, response1.data[2].population],
                            [response.data[3].province, response1.data[3].population]
                        ]);
                        // set chart title text settings
                        chart.title('Integration: Country Stats')
                            //set chart radius
                            .radius('43%')
                            // create empty area in pie chart
                            .innerRadius('30%');
                        // set container id for the chart
                        chart.container('container_anychart');
                        // initiate chart drawing
                        chart.draw();
                    });
                });
            });
            //4-------------------API grupo 6 Uefa-country-rankings---------------------------------
            $http.get(api4).then(function(response1) {
                $http.get(myApi).then(function(response) {
                    anychart.onDocumentReady(function() {
                        // create pie chart with passed data
                        var chart = anychart.pie([
                            [response.data[0].province, response1.data[0].countryConsumition],
                            [response.data[1].province, response1.data[1].countryConsumition],
                            [response.data[2].province, response1.data[2].countryConsumition],
                            [response.data[3].province, response1.data[3].countryConsumition]
                        ]);
                        // set chart title text settings
                        chart.title('Integration: Beer Consumed Stats')
                            //set chart radius
                            .radius('43%')
                            // create empty area in pie chart
                            .innerRadius('30%');
                        // set container id for the chart
                        chart.container('container_anychart2');
                        // initiate chart drawing
                        chart.draw();
                    });
                });
            });

            //7-INTEGRACION CON API EXTERNA 1
            $http.get(apiExterna1).then(function(response) {
                $http.get(myApi).then(function(response2) {
                    am4core.ready(function() {

                        // Themes begin
                        am4core.useTheme(am4themes_animated);
                        // Themes end

                        // Create chart instance
                        var chart = am4core.create("externa1", am4charts.PieChart);

                        // Add data
                        chart.data = [
                            { "eduexpen": response.data[0].date, "victims": response2.data[0].victims },
                            { "eduexpen": response.data[1].date, "victims": response2.data[1].victims },
                            { "eduexpen": response.data[2].date, "victims": response2.data[2].victims },
                            { "eduexpen": response.data[3].date, "victims": response2.data[3].victims },
                            { "eduexpen": response.data[4].date, "victims": response2.data[4].victims }
                        ];

                        // Add and configure Series
                        var pieSeries = chart.series.push(new am4charts.PieSeries());
                        pieSeries.dataFields.value = "victims";
                        pieSeries.dataFields.category = "eduexpen";
                        pieSeries.slices.template.stroke = am4core.color("#fff");
                        pieSeries.slices.template.strokeWidth = 2;
                        pieSeries.slices.template.strokeOpacity = 1;

                        // This creates initial animation
                        pieSeries.hiddenState.properties.opacity = 1;
                        pieSeries.hiddenState.properties.endAngle = -90;
                        pieSeries.hiddenState.properties.startAngle = -90;

                    });
                });
            });
            //8-INTEGRACION CON API EXTERNA 2
            var income = [];
            var label = [];
            $http.get(apiExterna2).then(function(response) {
                $http.get(myApi).then(function(response1) {
                    for (var i = 0; i < response.data.length; i++) {
                        income.push(response.data[i].number);
                    }
                    for (var i = 0; i < response1.data.length; i++) {
                        label.push(response1.data[i].province);
                    }
                    var ctx = document.getElementById('externa2').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'polarArea',
                        data: {
                            labels: [response1.data[0].province, response1.data[1].province, response1.data[2].province, response1.data[3].province, response1.data[4].province, response1.data[5].province],
                            datasets: [{
                                label: '# Income',
                                data: [income[0], income[1], income[2], income[3], income[4], income[5]],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 2
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                });
            });
        });
    });
}]);
