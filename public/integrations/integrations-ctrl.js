var app = angular.module("app");


app.controller("IntegrationsCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("IntegrationsCtrl initicialized!");

    var myApi = "https://sos1819-14.herokuapp.com/api/v1/deceaseds";
    var api1 = "/proxy1";
    var api2 = "/proxy2";
    var api3 = "/proxy3";
    var api4 = "/proxy4";
    var api5 = "/proxy5";
    var api6 = "/proxy6";
    var apiExterna1 = "https://api.openweathermap.org/data/2.5/weather?q=Seville&appid=a58c838b9e41e87a40337f6e0b5ebc10";

    var datoAux = [];
    var datoAux2 = [];
    var datoAux3 = [];

    //-------------------API grupo 6 - Jesus Ezcurra---------------------------------
    $http.get(api1).then(function(responseApi1) {
        var i;
        for (i = 0; i < responseApi1.data.length; i++) {
            datoAux.push(responseApi1.data[i].country);
            datoAux2.push(responseApi1.data[i].points);
            datoAux3.push(responseApi1.data[i].season);
        }

        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: "Uefa Club Rankings"
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
                    text: 'Points',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' points'
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
                name: 'Total Points',
                data: [datoAux2[0], datoAux2[1], datoAux2[2], datoAux2[3], datoAux2[4]]
            }]
        });

    });


    //-------------------API grupo 8 - M Dolores Lopez---------------------------------

    var dato = [];
    var dato1 = [];

    $http.get(api2).then(function(response) {
        var i;
        for (i = 0; i < response.data.length; i++) {
            dato.push(response.data[i].country);
            dato1.push(response.data[i].touristDeparture)
        }
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['Country', 'Deceaseds'],
                [dato[0], dato1[0]],
                [dato[1], dato1[1]],
                [dato[2], dato1[2]],
                [dato[3], dato1[3]]
            ]);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions-div'));

            chart.draw(data, options);
        }
    });

    //-------------------API grupo 2 - Pablo Garcia---------------------------------


    $http.get(api3).then(function(response2) {
        anychart.onDocumentReady(function() {
            // create pie chart with passed data
            var data = anychart.data.set([
                [response2.data[0].company, response2.data[0].employee],
                [response2.data[1].company, response2.data[1].employee],
                [response2.data[2].company, response2.data[2].employee],
                [response2.data[3].company, response2.data[3].employee],
                [response2.data[4].company, response2.data[4].employee]
            ]);

            var wealth = data.mapAs({ 'x': 0, 'value': 1 });

            var chart = anychart.pie(wealth);
            chart.labels()
                .hAlign('center')
                .position('outside')
                .format('{%Value} points');

            // set chart title text settings
            chart.title('Companies Stats');

            // set legend title text settings
            chart.legend()
                // set legend position and items layout
                .position('center-bottom')
                .itemsLayout('horizontal')
                .align('center');

            // set container id for the chart
            chart.container('container_anychart');
            // initiate chart drawing
            chart.draw();
        });
    });


    //-------------------API grupo 4 - Juan Pedro---------------------------------

    $http.get(api4).then(function(response1) {
        anychart.onDocumentReady(function() {
            // create pie chart with passed data
            var chart = anychart.pie([
                [response1.data[0].country, response1.data[0].countryConsumition],
                [response1.data[1].country, response1.data[1].countryConsumition],
                [response1.data[2].country, response1.data[2].countryConsumition],
                [response1.data[3].country, response1.data[3].countryConsumition]
            ]);

            // set chart title text settings
            chart.title('Beer consumed Stats')
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

     //-------------------INTEGRACION con API grupo 5  ---------------------------------
    
    //morris.js
    $http.get(myApi).then(function(response) {
        $http.get(api5).then(function(response2) {
            Morris.Donut({
                element: 'example',
                data: [
                    { label: response.data[0].year, value: response2.data[0].co2_stats },
                    { label: response.data[1].year, value: response2.data[1].co2_stats },
                    { label: response.data[2].year, value: response2.data[2].co2_stats },
                    { label: response.data[3].year, value: response2.data[3].co2_stats },
                    { label: response.data[4].year, value: response2.data[4].co2_stats }
                ]
            });

        });
    });


    //-------------------INTEGRACION con API grupo 11 - Antonio Jesus ---------------------------------
    
    $http.get(api6).then(function(response) {
        $http.get(myApi).then(function(response2) {


            am4core.ready(function() {

                // Themes begin
                am4core.useTheme(am4themes_animated);
                // Themes end

                // Create chart instance
                var chart = am4core.create("container_a", am4charts.PieChart);

                // Add data
                chart.data = [
                    { "eduexpen": response.data[0].educationExpense, "deads": response2.data[0].number },
                    { "eduexpen": response.data[1].educationExpense, "deads": response2.data[1].number },
                    { "eduexpen": response.data[2].educationExpense, "deads": response2.data[2].number },
                    { "eduexpen": response.data[3].educationExpense, "deads": response2.data[3].number },
                    { "eduexpen": response.data[4].educationExpense, "deads": response2.data[4].number }
                ];

                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries());
                pieSeries.dataFields.value = "deads";
                pieSeries.dataFields.category = "eduexpen";
                pieSeries.slices.template.stroke = am4core.color("#fff");
                pieSeries.slices.template.strokeWidth = 2;
                pieSeries.slices.template.strokeOpacity = 1;

                // This creates initial animation
                pieSeries.hiddenState.properties.opacity = 1;
                pieSeries.hiddenState.properties.endAngle = -90;
                pieSeries.hiddenState.properties.startAngle = -90;

            }); // end am4core.ready()
        });
    });
    
    
    //INTEGRACIO CON API EXTERNA  
    
    
 $http.get("apiExterna1").then(function(response) {
        $http.get("myApi").then(function (response2) {
            anychart.onDocumentReady(function() {
                // create data set
                var data = anychart.data.set([
                    [response2.data[0].province, response.data.main.temp],
                    [response2.data[1].province, response.data.main.pressure],
                    [response2.data[2].province, response.data.main.humidity],
                    [response2.data[3].province, response.data.main.temp_min]
                ]);

                // create pie chart with passed data
                var chart = anychart.pie(data);

                // set chart radius
                chart.innerRadius('65%')
                    // set value for the exploded slices
                    .explode(25);

                // create standalone label and set settings
                var label = anychart.standalones.label();
                label.enabled(true)
                    .text('Zonas recogidas de mi api con info meteorológica de api externa')
                    .width('100%')
                    .height('100%')
                    .adjustFontSize(true, true)
                    .minFontSize(10)
                    .maxFontSize(25)
                    .fontColor('#60727b')
                    .position('center')
                    .anchor('center')
                    .hAlign('center')
                    .vAlign('middle');

                // set label to center content of chart
                chart.center().content(label);

                // create range color palette with color ranged
                var palette = anychart.palettes.rangeColors();
                palette.items([
                    { color: '#c26364' },
                    { color: '#dba869' }
                ]);
                // set chart palette
                chart.palette(palette);

                // set hovered settings
                chart.hovered()
                    .fill('#6f3448');

                // set selected settings
                chart.selected()
                    .fill('#ff6e40');

                // set hovered outline settings
                chart.hovered().outline()
                    .fill(function() {
                        return anychart.color.lighten('#6f3448', 0.55);
                    });

                // set selected outline settings
                chart.selected().outline()
                    .offset(5)
                    .fill(function() {
                        return anychart.color.lighten('#ff6e40', 0.25);
                    });

                // set container id for the chart
                chart.container('externa1');
                // initiate chart drawing
                chart.draw();
            });

        });
    });



}]);
