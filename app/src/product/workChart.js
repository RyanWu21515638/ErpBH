var chartModule = angular.module('chartModule', []);
chartModule.controller('chartCtrl', function ($scope,flowService) {

    $scope.inputprj = true;

    var time = new Date();
    $scope.t1={
        year:time.getFullYear(),
        month:time.getMonth()
    };
    $scope.t2={
        year:time.getFullYear(),
        month:time.getMonth()+1
    };
    if($scope.t1.month<10)
        $scope.t1.month = "0"+$scope.t1.month;
    if($scope.t2.month<10)
        $scope.t2.month = "0"+$scope.t2.month;




    var title1 = {
        text: '万达项目日切割量和总切割量'
    };
    var xAxis1 = {
        categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
        crosshair: true
    };

    var series1 = [{
        name: '日切割量',
        type: 'column',
        data: [20, 25, 30, 12, 14, 17, 13, 14, 26, 19, 95, 54, 85, 62, 77, 93],
        tooltip: {
            valueSuffix: ' 块'
        }
    }, {
        name: '总切割量',
        type: 'spline',
        yAxis: 1,
        data: [20, 45, 70, 82, 96, 103, 116, 130, 156, 175, 270, 324, 378, 463, 525, 602],
        tooltip: {
            valueSuffix: '块'
        }
    }];



    $('#container1').ready(function () {
        var chart = {
            zoomType: 'xy'
        };
        var title = {
            text: '万达项目日切割量和总切割量'
        };

        var yAxis = [{ // 第一条Y轴
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '日切割量(/块)',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // 第二条Y轴
            title: {
                text: '总切割量(/块)',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }];
        var tooltip = {
            shared: true
        };
        var legend = {
            layout: 'vertical',
            align: 'left',
            x: 60,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        };

        var json = {};
        json.chart = chart;
        json.title = title;
        json.xAxis = xAxis1;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.legend = legend;
        json.series = series1;
        $('#container1').highcharts(json);
    });

    $('#container2').ready(function () {
        var chart = {
            zoomType: 'xy'
        };
        var title = {
            text: '万达项目日冲孔量和总冲孔量'
        };
        var xAxis = {
            categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
            crosshair: true
        };
        var yAxis = [{ // 第一条Y轴
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '日冲孔量(/块)',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // 第二条Y轴
            title: {
                text: '总冲孔量(/块)',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }];
        var tooltip = {
            shared: true
        };
        var legend = {
            layout: 'vertical',
            align: 'left',
            x: 60,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        };
        var series = [{
            name: '日冲孔量',
            type: 'column',

            data: [10, 20, 30, 40, 50, 60, 70, 10, 20, 30, 40, 50, 60, 70],
            tooltip: {
                valueSuffix: ' 块'
            }

        }, {
            name: '总冲孔量',
            type: 'spline',
            yAxis: 1,
            data: [10, 30, 60, 100, 150, 210, 280, 290, 310, 340, 380, 430, 490, 560],
            tooltip: {
                valueSuffix: '块'
            }
        }
        ];

        var json = {};
        json.chart = chart;
        json.title = title;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.legend = legend;
        json.series = series;
        $('#container2').highcharts(json);
    });

    $('#container3').ready(function () {
        var chart = {
            zoomType: 'xy'
        };
        var title = {
            text: '万达项目日焊接量和总焊接量'
        };
        var xAxis = {
            categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
            crosshair: true
        };
        var yAxis = [{ // 第一条Y轴
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '日焊接量(/块)',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // 第二条Y轴
            title: {
                text: '总焊接量(/块)',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }];
        var tooltip = {
            shared: true
        };
        var legend = {
            layout: 'vertical',
            align: 'left',
            x: 60,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        };
        var series = [{
            name: '日焊接量',
            type: 'column',

            data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54, 100, 100, 100, 100],
            tooltip: {
                valueSuffix: ' 块'
            }

        }, {
            name: '总焊接量',
            type: 'spline',
            yAxis: 1,
            data: [49, 120, 226, 355, 499, 675, 810, 958, 1174, 1368, 1463, 1517, 1617, 1717, 1817, 1919],
            tooltip: {
                valueSuffix: '块'
            }
        }
        ];

        var json = {};
        json.chart = chart;
        json.title = title;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.legend = legend;
        json.series = series;
        $('#container3').highcharts(json);
    });

    $('#container4').ready(function () {
        var chart = {
            zoomType: 'xy'
        };
        var title = {
            text: '万达项目日切割量和总切割量'
        };
        var xAxis = {
            categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
            crosshair: true
        };
        var yAxis = [{ // 第一条Y轴
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '日切割量(/块)',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // 第二条Y轴
            title: {
                text: '总切割量(/块)',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }];
        var tooltip = {
            shared: true
        };
        var legend = {
            layout: 'vertical',
            align: 'left',
            x: 60,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        };
        var series = [{
            name: '日切割量',
            type: 'column',

            data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54, 100, 100, 100, 100],
            tooltip: {
                valueSuffix: ' 块'
            }

        }, {
            name: '总切割量',
            type: 'spline',
            yAxis: 1,
            data: [49, 120, 220, 350, 500, 676, 800, 950, 1160, 1360, 1460, 1500, 1600, 1700, 1800, 1900],
            tooltip: {
                valueSuffix: '块'
            }
        }
        ];

        var json = {};
        json.chart = chart;
        json.title = title;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.legend = legend;
        json.series = series;
        $('#container4').highcharts(json);
    });

    $("#timepicker1").datetimepicker({
        language: 'zh-CN',
        format: "yyyy-mm",
        startView:3,
        minView: 3,
        autoclose: true,
        todayBtn: false,
        pickerPosition: "bottom-left"
    }).on('changeMonth', function (ev) {
        console.log(ev);
        $scope.t1.year = ev.date.getFullYear();
        $scope.t1.month = ev.date.getMonth() + 1;
        if ($scope.t1.year > $scope.t2.year || $scope.t1.month > $scope.t2.month) {
            alert("开始时间不允许大于结束时间！");
        }

    }).on("hide", function () {
        $("#timepicker1").blur();
    });

    $("#timepicker2").datetimepicker({
        language: 'zh-CN',
        format: "yyyy-mm",
        startView:3,
        minView: 3,
        autoclose: true,
        todayBtn: false,
        pickerPosition: "bottom-left"
    })
        .on('changeMonth', function (ev) {
            $scope.t2.year = ev.date.getFullYear();
            $scope.t2.month = ev.date.getMonth() + 1;
            if ($scope.t1.year > $scope.t2.year || $scope.t1.month > $scope.t2.month) {
                alert("结束时间不允许小于开始时间！");
            }
        }).on("hide", function () {
        $("#timepicker2").blur();
    });
});