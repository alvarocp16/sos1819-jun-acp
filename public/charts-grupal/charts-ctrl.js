angular
    .module("app")
    .controller("ChartsGrupalCtrl", ["$scope", "$http", "$routeParams", "$location", "$rootScope", function($scope, $http, $routeParams, $location, $rootScope) {
        var province = [];
        var life = [];
        var number = [];
        var penalty = [];
        
        var province1 = [];
        var victims = [];
        var accidentswithvictims = [];
        var injurednothospitalizedinaccidents = [];
        
        var province2 = [];
        var number_of_deceased = [];
        var accident_with_victim = [];
        var injured_hospitalized = [];
        $http.get("api/v1/deceaseds").then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                province.push(response.data[i].province + " " + response.data[i].year);
                life.push(response.data[i].life);
                number.push(response.data[i].number);
                penalty.push(response.data[i].penalty);
            }
        });
        $http.get("api/v1/elements").then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                province1.push(response.data[i].province + " " + response.data[i].year);
                victims.push(response.data[i].victims);
                accidentswithvictims.push(response.data[i].accidentswithvictims);
                injurednothospitalizedinaccidents.push(response.data[i].injurednothospitalizedinaccidents);
            }
        });
        $http.get("api/v1/injured-hospitalized").then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                province2.push(response.data[i].province + " " + response.data[i].year);
                number_of_deceased.push(response.data[i].number_of_deceased);
                accident_with_victim.push(response.data[i].accident_with_victim);
                injured_hospitalized.push(response.data[i].injured_hospitalized);
            }
            Highcharts.chart('container', {
                chart: {
                    type: 'area',
                    spacingBottom: 30
                },
                title: {
                    text: "Spain's Accidents Stats"
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                xAxis: {
                    categories: province
                },
                yAxis: {
                    title: {
                        text: 'Y-Axis'
                    },
                    labels: {
                        formatter: function() {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>' + this.series.name + '</b><br/>' +
                            this.x + ': ' + this.y;
                    }
                },
                plotOptions: {
                    area: {
                        fillOpacity: 0.5
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                        name: 'Lifes',
                        data: life
                    }, {
                        name: 'Deceaseds',
                        data: number
                    }, {
                        name: 'Penalties',
                        data: penalty
                    },
                    {
                        name: 'Victims',
                        data: victims
                    }, {
                        name: 'Health Expense',
                        data: accidentswithvictims
                    }, {
                        name: 'Injured not hospitalized',
                        data: injurednothospitalizedinaccidents
                    }, {
                        name: 'Expense',
                        data: number_of_deceased
                    }, {
                        name: 'Accidents w/ victims',
                        data: accident_with_victim
                    }, {
                        name: 'Injured hospitalized',
                        data: injured_hospitalized
                    }
                ]
            });
        });
    }]);
    