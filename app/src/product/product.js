var productModule = angular.module('productModule', ['angularTreeview', 'ngResource']);
productModule
    .controller('productCtrl', function ($scope, $rootScope, $http, $timeout, $interval, flowService, $cookies, $state) {
            //----------------------参数初始化----------------------------------------------------------------------------

            $scope.scanner = {};               //存储 扫描数据
            $scope.task = {};                  //储存 任务数据
            $scope.inputprj = true;            //打印时 项目下拉框(enable,disable)
            $scope.ion = 0;                    //已开料
            $scope.imon = 0;                   //未开料
            $scope.punched = 0;                //已冲孔
            $scope.no_punched = 0;             //未冲孔
            $scope.weld = 0;                   //已焊接
            $scope.no_weld = 0;                //未焊接
            $scope.material = 0;               //已分料
            $scope.no_material = 0;            //未分料
            $scope.num = 0;                    //所有模板总数
            $scope.feed = 0;
            $scope.punchscann_before = 0;      //
            $scope.jointscann_before = 0;      //
            $scope.printbl1 = new Array();     //
            $scope.taskedbl = new Array();     //
            $scope.punchtaskedbl = new Array();//
            $scope.weldtaskedbl = new Array(); //
            $scope.feedtaskedbl = new Array(); //
            //$scope.taskedarraybl = [0, 1, 2, 3];//
            $scope.punchrc1 = new Array();     //
            $scope.weldrc1 = new Array();      //
            $scope.feedrc1 = new Array();   //
            $scope.tasked = [];       //勾选框分配任务
            $scope.mechingtasked = [];       //勾选框分配任务
            $scope.cutchosen = new Array();
            $scope.slbl = new Array(false);
            $scope.slAbl = new Array(false);
            $scope.PRINTbl = new Array(false);     //
            $scope.username = new Array();
            $scope.incisepercentage = new Array(0);
            $scope.punchpercentage = new Array(0);
            $scope.weldpercentage = new Array(0);
            $scope.feedpercentage = new Array(0);

            $scope.conf = [];
            $scope.conf2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            $scope.conf2print = function () {
                console.log($scope.conf2);
            }
            $scope.mechinechosebl = false;
            $scope.indexcnum = 0;
            $scope.project_id = 0;
            $scope.typeselectquery = '1111';
            $scope.tasksum = 0;
            $scope.fuzzy_var = '';
            $scope.taskednum = 0;
            $scope.prj_sum = 0;
            //post数据头
            $scope.postCfg = {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (data) {
                    return $.param(data);
                }
            };
            //页面分页控制变量
            $scope.paginationConf = {
                currentPage: 1,
                totalItems: 22,
                itemsPerPage: 100,
                pagesLength: 10,
                perPageOptions: [10, 20, 30, 40, 50],
                /*onChange: function () {
                 }*/
            };
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage + totalItems', function (newValue, oldValue, scope) {
                $scope.slAbl.length = 0;
                $scope.slbl.length = 0;
                $scope.cutchosen.length = 0;
                $scope.tasked.length = 0;
                if ($scope.project_id == 0)
                    console.log('init');
                else {
                    flowService.allformwork($scope.project_id, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage).then(
                        function (res) {
                            $scope.spinnerbl = true;
                            var toDo = function () {
                                $scope.spinnerbl = false;

                            };
                            $timeout(toDo, 3000);
                            $scope.cutinfo = res.data.data;
                            if ($scope.cutinfo.success == false)
                                console.log('该项目还未上传模板');
                            else {
                                $scope.num = 0;
                                $scope.ion = 0;
                                $scope.imon = 0;
                                $scope.punched = 0;
                                $scope.no_punched = 0;
                                $scope.weld = 0;
                                $scope.no_weld = 0;
                                $scope.material = 0;
                                $scope.no_material = 0;
                                $scope.paginationConf.totalItems = res.data.count;
                                for (var c2 = 0; c2 < $scope.cutinfo.length; c2++) {
                                    //console.log($scope.cutinfo.length);
                                    $scope.num = $scope.num + parseInt($scope.cutinfo[c2].num);
                                    $scope.ion = $scope.ion + parseInt($scope.cutinfo[c2].ion);
                                    $scope.imon = $scope.imon + parseInt($scope.cutinfo[c2].imon);

                                    $scope.punched = $scope.punched + parseInt($scope.cutinfo[c2].punched);
                                    $scope.no_punched = $scope.no_punched + parseInt($scope.cutinfo[c2].no_punched);

                                    $scope.weld = $scope.weld + parseInt($scope.cutinfo[c2].weld);
                                    $scope.no_weld = $scope.no_weld + parseInt($scope.cutinfo[c2].no_weld);

                                    $scope.material = $scope.material + parseInt($scope.cutinfo[c2].material);
                                    $scope.no_material = $scope.no_material + parseInt($scope.cutinfo[c2].no_material);
                                    /*$scope.taskedarraybl[c2 + 1] = $scope.cutinfo[c2].tasked;*/
                                    for (var print2 = 0; print2 < $scope.cutinfo[c2].data.length; print2++) {
                                        // $scope.printbl1[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].incise;
                                        $scope.taskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].tasked;
                                        $scope.punchtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].punchtasked;
                                        $scope.weldtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].weldtasked;
                                        $scope.feedtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].feedtasked;


                                    }
                                }
                            }
                        });
                }
            });

            flowService.getproject().then(
                function (res) {
                    $scope.prj = res.data;
                });
            flowService.getProjectNew().then(
                function (res) {
                    $scope.prjNew = res.data;
                });

            $scope.saveDeleteId = function (x, y) {
                $scope.deleteprjid = x;
                $scope.deleteprjname = y;
            }
            //删除项目
            $scope.deleteprj = function () {
                flowService.project_delete($scope.deleteprjid).then(
                    function (res) {
                        $scope.prj = res.data;
                    });
            }
            //修改项目状态-可见/不可见
            $scope.changeProjectStatus = function (prjId) {
                flowService.changePrjStatus(prjId).then(
                    function (res) {
                        flowService.getProjectNew().then(
                            function (res) {
                                $scope.prjNew = res.data;
                            });
                    });
            }
            //-----------------------iframe焦点控制-------------------
            var IframeOnClick = {
                resolution: 200,
                iframes: [],
                interval: null,
                Iframe: function () {
                    this.element = arguments[0];
                    this.cb = arguments[1];
                    this.hasTracked = false;
                },
                track: function (element, cb) {
                    this.iframes.push(new this.Iframe(element, cb));
                    if (!this.interval) {
                        var _this = this;
                        this.interval = setInterval(function () {
                            _this.checkClick();
                        }, this.resolution);
                    }
                },
                checkClick: function () {
                    if (document.activeElement) {
                        var activeElement = document.activeElement;

                        for (var i in this.iframes) {
                            if (activeElement === this.iframes[i].element) {// user is in this Iframe
                                if (this.iframes[i].hasTracked == false) {
                                    this.iframes[i].cb.apply(window, []);
                                    this.iframes[i].hasTracked = true;
                                }
                            } else {
                                this.iframes[i].hasTracked = false;
                            }
                        }
                    }
                }
            };
            IframeOnClick.track(document.getElementById("iframe1"), function () {
                $(document.body).css({
                    "overflow-x": "hidden",
                    "overflow-y": "hidden"
                });
            });
            IframeOnClick.track(document.getElementById("iframe2"), function () {
                $(document.body).css({
                    "overflow-x": "hidden",
                    "overflow-y": "hidden"
                });
            });
            IframeOnClick.track(document.getElementById("iframe3"), function () {
                $(document.body).css({
                    "overflow-x": "hidden",
                    "overflow-y": "hidden"
                });
            });
            IframeOnClick.track(document.getElementById("iframe4"), function () {
                $(document.body).css({
                    "overflow-x": "hidden",
                    "overflow-y": "hidden"
                });
            });
            //---------------生产看板---------------------------------
            var time = new Date();
            $scope.t1 = {
                year: time.getFullYear(),
                month: time.getMonth() + 1
            };
            $scope.t2 = {
                year: time.getFullYear(),
                month: time.getMonth() + 1
            };
            if ($scope.t1.month < 10)
                $scope.t1.month = "0" + $scope.t1.month;
            if ($scope.t2.month < 10)
                $scope.t2.month = "0" + $scope.t2.month;
            //时间选择器1
            $("#timepicker1").datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm",
                startView: 3,
                minView: 3,
                autoclose: true,
                todayBtn: false,
                pickerPosition: "bottom-left"
            }).on('changeMonth', function (ev) {
                $scope.t1.year = ev.date.getFullYear();
                $scope.t1.month = ev.date.getMonth() + 1;
                console.log('t1' + JSON.stringify($scope.t1) + 't2' + JSON.stringify($scope.t2));
                if ($scope.project_id) {
                    $scope.changecharts($scope.project_id, $scope.t1.year + '-' + $scope.t1.month, $scope.t2.year + '-' + $scope.t2.month);
                }
            }).on("hide", function () {
                $("#timepicker1").blur();
            });
            //时间选择器2
            $("#timepicker2").datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm",
                startView: 3,
                minView: 3,
                autoclose: true,
                todayBtn: false,
                pickerPosition: "bottom-left"
            })
                .on('changeMonth', function (ev) {
                    $scope.t2.year = ev.date.getFullYear();
                    $scope.t2.month = ev.date.getMonth() + 1;
                    console.log('t1' + JSON.stringify($scope.t1) + 't2' + JSON.stringify($scope.t2));
                    if ($scope.project_id) {
                        $scope.changecharts($scope.project_id, $scope.t1.year + '-' + $scope.t1.month, $scope.t2.year + '-' + $scope.t2.month);
                    }
                }).on("hide", function () {
                $("#timepicker2").blur();
            });
            //选择项目
            $scope.prjselect = function (x) {
                document.getElementById("prjbar").style.display = 'block';
                document.getElementById("container1").style.display = 'block';
                $scope.project_id = x;
                flowService.static($scope.project_id).then(
                    function (res) {
                        $scope.static = res.data;
                        console.log(res.data.incise[0][0].num);
                        console.log(res.data.type.length);
                        $scope.incisepercent = ($scope.static.sum[0].incise / $scope.static.sum[0].num * 100).toString().substring(0, 4);
                        $scope.punchpercent = ($scope.static.sum[0].punched / $scope.static.sum[0].num * 100).toString().substring(0, 4);
                        $scope.weldpercent = ($scope.static.sum[0].weld / $scope.static.sum[0].num * 100).toString().substring(0, 4);
                        $scope.feedpercent = ($scope.static.sum[0].material / $scope.static.sum[0].num * 100).toString().substring(0, 4);
                        for (var i = 0; i < $scope.static.type.length; i++) {
                            $scope.incisepercentage[i] = parseInt($scope.static.incise[i][0].num);
                            $scope.punchpercentage[i] = parseInt($scope.static.punch[i][0].num);
                            $scope.weldpercentage[i] = parseInt($scope.static.weld[i][0].num);
                            $scope.feedpercentage[i] = parseInt($scope.static.material[i][0].num);

                        }
                        var dataincise = [];
                        var datapunch = [];
                        var dataweld = [];
                        var datafeed = [];
                        dataincise.push({
                            name: $scope.static.type[0],
                            y: $scope.incisepercentage[0],
                            sliced: true,
                            selected: true
                        });
                        datapunch.push({
                            name: $scope.static.type[0],
                            y: $scope.punchpercentage[0],
                            sliced: true,
                            selected: true
                        });
                        dataweld.push({
                            name: $scope.static.type[0],
                            y: $scope.weldpercentage[0],
                            sliced: true,
                            selected: true
                        });
                        datafeed.push({
                            name: $scope.static.type[0],
                            y: $scope.feedpercentage[0],
                            sliced: true,
                            selected: true
                        });
                        for (var j = 1; j < $scope.static.type.length; j++) {
                            dataincise.push([$scope.static.type[j], $scope.incisepercentage[j]]);
                            datapunch.push([$scope.static.type[j], $scope.punchpercentage[j]]);
                            dataweld.push([$scope.static.type[j], $scope.weldpercentage[j]]);
                            datafeed.push([$scope.static.type[j], $scope.feedpercentage[j]]);
                        }
                        console.log(dataincise, datapunch, dataweld, datafeed);
                        console.log($scope.incisepercentage, $scope.punchpercentage, $scope.weldpercentage, $scope.feedpercentage);
                        $scope.changepie(dataincise, datapunch, dataweld, datafeed);
                     }
                )
                for (var i = 0; i < $scope.prj.length; i++) {
                    if ($scope.prj[i].id == x) {
                        $scope.project_name = $scope.prj[i].name;
                        break;
                    }
                }
                $scope.changecharts(x, $scope.t1.year + '-' + $scope.t1.month, $scope.t2.year + '-' + $scope.t2.month);
            };
            //回到上一个统计
            $scope.back = function () {
                $scope.changecharts($scope.project_id, $scope.t1.year + '-' + $scope.t1.month, $scope.t2.year + '-' + $scope.t2.month);
            };
            //chart动态change
            $scope.changecharts = function (x, stt, edt) {
                if (stt.split('-')[0] == edt.split('-')[0]) {
                    var type = 1;
                }
                else {
                    var type = 2;
                }
                flowService.showchart(x, stt, edt, type).then(
                    function (res) {
                        $scope.everydaycut = res.data.incise;
                        var categories1 = [];
                        var data1 = [];
                        var data12 = [];
                        var sum = 0;
                        console.log($scope.everydaycut.length);
                        for (var cut = 0; cut < $scope.everydaycut.length; cut++) {
                            sum = sum + parseInt($scope.everydaycut[cut].incise);
                            categories1.push($scope.everydaycut[cut].incise_time);
                            data1.push(parseInt($scope.everydaycut[cut].incise));
                            data12.push(sum);
                        }
                        ;
                        console.log(categories1);
                        $scope.everydaypunch = res.data.punch;
                        var categories2 = [];
                        var data2 = [];
                        var data22 = [];
                        var sum = 0;
                        for (var pc = 0; pc < $scope.everydaypunch.length; pc++) {
                            sum = sum + parseInt($scope.everydaypunch[pc].punch);
                            categories2.push($scope.everydaycut[pc].punch_time);
                            data2.push(parseInt($scope.everydaypunch[pc].punch));
                            data22.push(sum);
                        }
                        ;
                        $scope.everydayweld = res.data.weld;
                        var categories3 = [];
                        var data3 = [];
                        var data32 = [];
                        var sum = 0;
                        for (var wd = 0; wd < $scope.everydayweld.length; wd++) {
                            sum = sum + parseInt($scope.everydayweld[wd].weld);
                            categories3.push($scope.everydaycut[wd].weld_time);
                            data3.push(parseInt($scope.everydayweld[wd].weld));
                            data32.push(sum);
                        }
                        ;
                        $scope.everydaymaterial = res.data.material;
                        var categories4 = [];
                        var data4 = [];
                        var data42 = [];
                        var sum = 0;
                        for (var mt = 0; mt < $scope.everydaymaterial.length; mt++) {
                            sum = sum + parseInt($scope.everydaymaterial[mt].material);
                            categories4.push($scope.everydaymaterial[mt].material_time);
                            data4.push(parseInt($scope.everydaymaterial[mt].material));
                            data42.push(sum);
                        }
                        ;
                        $('#container1').ready(function () {
                            var chart = {
                                zoomType: 'xy'
                            };
                            var title = {
                                text: $scope.project_name + '日切、冲、焊、分料和总切、冲、焊、分料统计'
                            };
                            var xAxis = {
                                categories: categories1,
                                crosshair: true
                            };

                            var series = [{
                                name: '日开料量',
                                type: 'column',
                                data: data1,
                                tooltip: {
                                    valueSuffix: ' 块'
                                }
                            }, {
                                name: '日冲孔量',
                                type: 'column',
                                data: data2,
                                tooltip: {
                                    valueSuffix: ' 块'
                                }
                            }, {
                                name: '日焊接量',
                                type: 'column',
                                data: data3,
                                tooltip: {
                                    valueSuffix: ' 块'
                                }
                            }, {
                                name: '日分料量',
                                type: 'column',
                                data: data4,
                                tooltip: {
                                    valueSuffix: ' 块'
                                }
                            }, {
                                name: '总开料量',
                                type: 'spline',
                                yAxis: 1,
                                data: data12,
                                tooltip: {
                                    valueSuffix: '块'
                                }
                            }, {
                                name: '总冲孔量',
                                type: 'spline',
                                yAxis: 1,
                                data: data22,
                                tooltip: {
                                    valueSuffix: '块'
                                },
                            }, {
                                name: '总焊接量',
                                type: 'spline',
                                yAxis: 1,
                                data: data32,
                                tooltip: {
                                    valueSuffix: '块'
                                },
                            }, {
                                name: '总分料量',
                                type: 'spline',
                                yAxis: 1,
                                data: data42,
                                tooltip: {
                                    valueSuffix: '块'
                                },
                            },];
                            var yAxis = [{ // 第一条Y轴
                                labels: {
                                    format: '{value}',
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                },
                                title: {
                                    text: '日切、冲、焊、分料(/块)',
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                }
                            }, { // 第二条Y轴
                                title: {
                                    text: '总切、冲、焊、分料(/块)',
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
                                shared: true,

                            };
                            var plotOptions = {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                },
                                series: {
                                    cursor: 'pointer',
                                    events: {
                                        click: function (e) {
                                            if (type == 1) {
                                                console.log(e.point.category);
                                                $scope.changecharts($scope.project_id, e.point.category.split('-')[0] + '-' + e.point.category.split('-')[1], e.point.category.split('-')[0] + '-' + e.point.category.split('-')[1]);
                                            }
                                            if (type == 2) {
                                                console.log(e.point.category);
                                                $scope.changecharts($scope.project_id, e.point.category + '-' + '01', e.point.category + '-' + '12');
                                            }
                                        }
                                    }
                                }
                            };
                            var legend = {
                                layout: 'horizontal',//horizontal、vertical
                                align: 'left',
                                x: 580,
                                verticalAlign: 'top',
                                y: 20,
                                floating: true,
                                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                            };

                            var json = {};
                            json.chart = chart;
                            json.title = title;
                            json.xAxis = xAxis;
                            json.yAxis = yAxis;
                            json.tooltip = tooltip;
                            json.legend = legend;
                            json.series = series;
                            json.plotOptions = plotOptions;
                            $('#container1').highcharts(json);
                        });
                    }
                );
            };
            //pie动态change
            $scope.changepie = function (dataincise, datapunch, dataweld, datafeed) {
                $(document).ready(function () {
                    var chart = {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    };
                    var title1 = {
                        text: '开料'
                    };
                    var title2 = {
                        text: '冲孔'
                    };
                    var title3 = {
                        text: '焊接'
                    };
                    var title4 = {
                        text: '分料'
                    };
                    var tooltip = {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    };
                    var plotOptions = {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true
                            },
                        }
                    };
                    var series1 = [{
                        type: 'pie',
                        name: '占比',
                        data: dataincise
                    }];
                    var series2 = [{
                        type: 'pie',
                        name: '占比',
                        data: datapunch
                    }];
                    var series3 = [{
                        type: 'pie',
                        name: '占比',
                        data: dataweld
                    }];
                    var series4 = [{
                        type: 'pie',
                        name: '占比',
                        data: datafeed
                    }];
                    var json1 = {};
                    json1.chart = chart;
                    json1.tooltip = tooltip;
                    json1.title = title1;
                    json1.series = series1;
                    json1.plotOptions = plotOptions;

                    var json2 = {};
                    json2.chart = chart;
                    json2.tooltip = tooltip;
                    json2.title = title2;
                    json2.series = series2;
                    json2.plotOptions = plotOptions;

                    var json3 = {};
                    json3.chart = chart;
                    json3.tooltip = tooltip;
                    json3.title = title3;
                    json3.series = series3;
                    json3.plotOptions = plotOptions;

                    var json4 = {};
                    json4.chart = chart;
                    json4.tooltip = tooltip;
                    json4.title = title4;
                    json4.series = series4;
                    json4.plotOptions = plotOptions;

                    $('#containerpie1').highcharts(json1);
                    $('#containerpie2').highcharts(json2);
                    $('#containerpie3').highcharts(json3);
                    $('#containerpie4').highcharts(json4);
                });
            };
            //-----------------------生产计划-------------------------
            $scope.mngjt = function () {
                $state.go('main.productmng.mechinemng');
            };
            //根据项目id、选择类型、关键字进行模糊查询
            $scope.select_fuzzy = function () {
                flowService.select_fuzzy_interface($scope.project_id, $scope.typeselectquery, $scope.fuzzy_var).then(
                    function (res) {
                        $scope.num = 0;
                        $scope.ion = 0;
                        $scope.imon = 0;
                        $scope.punched = 0;
                        $scope.no_punched = 0;
                        $scope.weld = 0;
                        $scope.no_weld = 0;
                        $scope.material = 0;
                        $scope.no_material = 0;
                        $scope.cutinfo = res.data.data;
                        for (var c2 = 0; c2 < $scope.cutinfo.length; c2++) {
                            $scope.num = $scope.num + parseInt($scope.cutinfo[c2].num);
                            $scope.ion = $scope.ion + parseInt($scope.cutinfo[c2].ion);
                            $scope.imon = $scope.imon + parseInt($scope.cutinfo[c2].imon);

                            $scope.punched = $scope.punched + parseInt($scope.cutinfo[c2].punched);
                            $scope.no_punched = $scope.no_punched + parseInt($scope.cutinfo[c2].no_punched);

                            $scope.weld = $scope.weld + parseInt($scope.cutinfo[c2].weld);
                            $scope.no_weld = $scope.no_weld + parseInt($scope.cutinfo[c2].no_weld);

                            $scope.material = $scope.material + parseInt($scope.cutinfo[c2].material);
                            $scope.no_material = $scope.no_material + parseInt($scope.cutinfo[c2].no_material);
                            for (var print2 = 0; print2 < $scope.cutinfo[c2].data.length; print2++) {
                                $scope.taskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].tasked;
                                $scope.punchtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].punchtasked;
                                $scope.weldtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].weldtasked;
                                $scope.feedtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].feedtasked;
                            }
                        }
                    }
                )
            }
            //查看已分配和未分配，
            $scope.allocateselect = function (x) {
                $scope.allocate = x;
                if ($scope.allocate == '') {
                    //如果allocate为''默认筛选未分配的--1，筛选已分配的；2，筛选未分配的
                    $scope.allocate = '2';
                }
            }
            //按选择类型查询
            $scope.typeselect = function (query) {
                $scope.typeselectquery = (query);
                $scope.num = 0;
                $scope.ion = 0;
                $scope.imon = 0;
                $scope.punched = 0;
                $scope.no_punched = 0;
                $scope.weld = 0;
                $scope.no_weld = 0;
                $scope.material = 0;
                $scope.no_material = 0;
                if ($scope.typeselectquery != null) {
                    flowService.allformwork2($scope.project_id, $scope.typeselectquery.toString(), $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage).then(
                        function (res) {
                            $scope.cutinfo = res.data.data;
                            if ($scope.cutinfo.success == false)
                                alert('该项目还未上传模板');
                            else {
                                $scope.paginationConf.totalItems = res.data.count;
                                for (var c2 = 0; c2 < $scope.cutinfo.length; c2++) {
                                    $scope.num = $scope.num + parseInt($scope.cutinfo[c2].num);
                                    $scope.ion = $scope.ion + parseInt($scope.cutinfo[c2].ion);
                                    $scope.imon = $scope.imon + parseInt($scope.cutinfo[c2].imon);

                                    $scope.punched = $scope.punched + parseInt($scope.cutinfo[c2].punched);
                                    $scope.no_punched = $scope.no_punched + parseInt($scope.cutinfo[c2].no_punched);

                                    $scope.weld = $scope.weld + parseInt($scope.cutinfo[c2].weld);
                                    $scope.no_weld = $scope.no_weld + parseInt($scope.cutinfo[c2].no_weld);

                                    $scope.material = $scope.material + parseInt($scope.cutinfo[c2].material);
                                    $scope.no_material = $scope.no_material + parseInt($scope.cutinfo[c2].no_material);
                                    for (var print2 = 0; print2 < $scope.cutinfo[c2].data.length; print2++) {
                                        $scope.taskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].tasked;
                                        $scope.punchtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].punchtasked;
                                        $scope.weldtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].weldtasked;
                                        $scope.feedtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].feedtasked;
                                    }
                                }
                            }
                        });
                }
                else {
                    flowService.allformwork($scope.project_id, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage).then(
                        function (res) {
                            $scope.cutinfo = res.data.data;
                            if ($scope.cutinfo.success == false)
                                alert('该项目还未上传模板');
                            else {
                                $scope.paginationConf.totalItems = res.data.count;
                                for (var c2 = 0; c2 < $scope.cutinfo.length; c2++) {
                                    console.log($scope.cutinfo.length);
                                    $scope.num = $scope.num + parseInt($scope.cutinfo[c2].num);
                                    $scope.ion = $scope.ion + parseInt($scope.cutinfo[c2].ion);
                                    $scope.imon = $scope.imon + parseInt($scope.cutinfo[c2].imon);

                                    $scope.punched = $scope.punched + parseInt($scope.cutinfo[c2].punched);
                                    $scope.no_punched = $scope.no_punched + parseInt($scope.cutinfo[c2].no_punched);

                                    $scope.weld = $scope.weld + parseInt($scope.cutinfo[c2].weld);
                                    $scope.no_weld = $scope.no_weld + parseInt($scope.cutinfo[c2].no_weld);

                                    $scope.material = $scope.material + parseInt($scope.cutinfo[c2].material);
                                    $scope.no_material = $scope.no_material + parseInt($scope.cutinfo[c2].no_material);
                                    for (var print2 = 0; print2 < $scope.cutinfo[c2].data.length; print2++) {
                                        $scope.taskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].tasked;
                                        $scope.punchtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].punchtasked;
                                        $scope.weldtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].weldtasked;
                                        $scope.feedtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].feedtasked;
                                    }
                                }
                            }
                        });
                }
            };
            //模板全选按钮
            $scope.cutselectArrayAll = function () {
                for (var i = 0; i < $scope.cutinfo.length; i++) {
                    $scope.cutselectArray(i+1, $scope.cutinfo[i].data);
                }
            }
            //某种型号模板全选-切割
            $scope.cutselectArray = function (x, y) {
                $scope.slAbl[x] = !$scope.slAbl[x];
                switch ($scope.slAbl[x]) {
                    case true:
                        for (var cuttask = 0; cuttask < y.length; cuttask++) {
                            var bl = false;
                            if ($scope.taskedbl[y[cuttask].id] == '1') {
                                bl = true;
                            }
                            else {
                                for (var i = 0; i < $scope.tasked.length; i++) {
                                    if (($scope.tasked[i].id == y[cuttask].id)) {
                                        bl = true;
                                    }
                                }
                            }
                            if (!bl) {
                                $scope.tasked.push({'id': y[cuttask].id});
                            }
                            $scope.cutchosen[y[cuttask].id] = (true && ($scope.taskedbl[y[cuttask].id] == '0'));
                        }
                        break;
                    case false:
                        for (var cuttask = 0; cuttask < y.length; cuttask++) {
                            $scope.ii = 0;
                            for (var i = 0; i < $scope.tasked.length; i++) {
                                if ($scope.tasked[i].id == y[cuttask].id) {
                                    $scope.ii = i;
                                    $scope.tasked[$scope.ii].id = 0;
                                }
                            }
                            $scope.cutchosen[y[cuttask].id] = false;
                        }
                        break;
                }
                $scope.tasksum = 0;
                for (var i = 0; i < $scope.tasked.length; i++) {
                    if ($scope.tasked[i].id != 0)
                        $scope.tasksum += 1;
                }
            };
            //某种型号模板全选-冲孔
            $scope.punchselectArray = function (x, y) {
                $scope.slAbl[x] = !$scope.slAbl[x];
                switch ($scope.slAbl[x]) {
                    case true:
                        for (var cuttask = 0; cuttask < y.length; cuttask++) {
                            var bl = false;
                            if ($scope.punchtaskedbl[y[cuttask].id] == '1') {
                                bl = true;
                            }
                            else {
                                for (var i = 0; i < $scope.tasked.length; i++) {
                                    if ($scope.tasked[i].id == y[cuttask].id) {
                                        bl = true;
                                    }
                                }
                            }
                            if (!bl) {
                                $scope.tasked.push({'id': y[cuttask].id});
                            }
                            $scope.cutchosen[y[cuttask].id] = (true && ($scope.punchtaskedbl[y[cuttask].id] == '0'));
                        }
                        break;
                    case false:
                        for (var cuttask = 0; cuttask < y.length; cuttask++) {
                            $scope.ii = 0;
                            for (var i = 0; i < $scope.tasked.length; i++) {
                                if ($scope.tasked[i].id == y[cuttask].id) {
                                    $scope.ii = i;
                                    $scope.tasked[$scope.ii].id = 0;
                                }
                            }
                            $scope.cutchosen[y[cuttask].id] = false;
                        }
                        break;
                }
                $scope.tasksum = 0;
                for (var i = 0; i < $scope.tasked.length; i++) {
                    if ($scope.tasked[i].id != 0)
                        $scope.tasksum += 1;
                }
            };
            //某种型号模板全选-焊接
            $scope.weldselectArray = function (x, y) {
                $scope.slAbl[x] = !$scope.slAbl[x];
                switch ($scope.slAbl[x]) {
                    case true:
                        for (var cuttask = 0; cuttask < y.length; cuttask++) {
                            var bl = false;
                            if ($scope.weldtaskedbl[y[cuttask].id] == '1') {
                                bl = true;
                            }
                            else {
                                for (var i = 0; i < $scope.tasked.length; i++) {
                                    if ($scope.tasked[i].id == y[cuttask].id) {
                                        bl = true;
                                    }
                                }
                            }
                            if (!bl) {
                                $scope.tasked.push({'id': y[cuttask].id});
                            }
                            $scope.cutchosen[y[cuttask].id] = (true && ($scope.weldtaskedbl[y[cuttask].id] == '0'));
                        }
                        break;
                    case false:
                        for (var cuttask = 0; cuttask < y.length; cuttask++) {
                            $scope.ii = 0;
                            for (var i = 0; i < $scope.tasked.length; i++) {
                                if ($scope.tasked[i].id == y[cuttask].id) {
                                    $scope.ii = i;
                                    $scope.tasked[$scope.ii].id = 0;
                                }
                            }
                            $scope.cutchosen[y[cuttask].id] = false;
                        }
                        break;
                }
                $scope.tasksum = 0;
                for (var i = 0; i < $scope.tasked.length; i++) {
                    if ($scope.tasked[i].id != 0)
                        $scope.tasksum += 1;
                }
            };
            //模板全选-分料
            $scope.feedselectArrayAll = function () {
                for (var i = 0; i < $scope.cutinfo.length; i++) {
                    $scope.feedselectArray(i+1, $scope.cutinfo[i].data);
                }
            }
            //某种型号模板全选-分料
            $scope.feedselectArray = function (x, y) {
                $scope.slAbl[x] = !$scope.slAbl[x];
                switch ($scope.slAbl[x]) {
                    case true:
                        for (var cuttask = 0; cuttask < y.length; cuttask++) {
                            var bl = false;
                            if ($scope.feedtaskedbl[y[cuttask].id] == '1') {
                                bl = true;
                            }
                            else {
                                for (var i = 0; i < $scope.tasked.length; i++) {
                                    if ($scope.tasked[i].id == y[cuttask].id) {
                                        bl = true;
                                    }
                                }
                            }
                            if (!bl) {
                                $scope.tasked.push({'id': y[cuttask].id});
                            }
                            $scope.cutchosen[y[cuttask].id] = (true && ($scope.feedtaskedbl[y[cuttask].id] == '0'));
                        }
                        break;
                    case false:
                        for (var cuttask = 0; cuttask < y.length; cuttask++) {
                            $scope.ii = 0;
                            for (var i = 0; i < $scope.tasked.length; i++) {
                                if ($scope.tasked[i].id == y[cuttask].id) {
                                    $scope.ii = i;
                                    $scope.tasked[$scope.ii].id = 0;
                                }
                            }
                            $scope.cutchosen[y[cuttask].id] = false;
                        }
                        break;
                }
                $scope.tasksum = 0;
                for (var i = 0; i < $scope.tasked.length; i++) {
                    if ($scope.tasked[i].id != 0)
                        $scope.tasksum += 1;
                }
            };
            //某块模板单独选中
            $scope.select = function (y) {
                $scope.slbl[y] = !$scope.slbl[y];
                switch ($scope.slbl[y]) {
                    case true:
                        $scope.tasked.push({'id': y});
                        $scope.cutchosen[y] = true;
                        break;
                    case false:
                        $scope.ii = 0;
                        for (var i = 0; i < $scope.tasked.length; i++) {
                            if ($scope.tasked[i].id == y) {
                                $scope.ii = i;
                                $scope.tasked[$scope.ii].id = 0;
                            }
                        }
                        $scope.cutchosen[y] = false;
                        break;
                }
                $scope.tasksum = 0;
                for (var i = 0; i < $scope.tasked.length; i++) {
                    if ($scope.tasked[i].id != 0)
                        $scope.tasksum += 1;
                }
            };
            $scope.tabtask = function () {
                document.getElementById('taskform').style.display = "none";
            };
            //提交任务前判断必须提交的内容是否为空
            $scope.isEmptyObject = function (e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            };
            //提交任务
            $scope.submittask = function () {
                $scope.task.formwork = $scope.tasked;
                $scope.task.prid = $scope.project_id;
                for (var i = 0; i < $scope.conf.length; i++) {
                    if ($scope.conf[i])
                        $scope.mechingtasked.push({'mechineid': $scope.mechineinfobygx[i].id});
                }
                $scope.task.mechine = $scope.mechingtasked;
                if ($scope.isEmptyObject($scope.task.formwork) || $scope.isEmptyObject($scope.task.mechine)) {
                    alert('指派人员、任务单、机台不能为空！请重新检查');
                }
                else {
                    flowService.taskadd($scope.task).then(
                        function (res) {
                            if (res.data.success == true) {
                                alert('分配任务成功！');
                                if ($scope.typeselectquery != '1111')
                                    $scope.typeselect($scope.typeselectquery);
                                else
                                    $scope.projectselect($scope.project_id);
                                $scope.resetall();
                            }
                        }
                    );
                }
            };
            //重置所选项
            $scope.resetall = function () {
                $scope.tasked.length = 0;
                $scope.cutchosen.length = 0;
                $scope.slAbl.length = 0;
                $scope.conf.length = 0;
                $scope.mechinechosebl = false;
                $scope.mechingtasked.length = 0;
            };
            $scope.queryyy = function (x) {
                //这个函数好像没什么用
                console.log(x);
            };
            //选择项目-任务计划分配
            $scope.projectselect = function (x) {
                $scope.project_id = x;
                $scope.num = 0;
                $scope.ion = 0;
                $scope.imon = 0;
                $scope.punched = 0;
                $scope.no_punched = 0;
                $scope.weld = 0;
                $scope.no_weld = 0;
                $scope.material = 0;
                $scope.no_material = 0;
                $scope.taskednum = 0;
                //根据项目去查询任务
                flowService.taskselect($scope.project_id).then(
                    function (res) {
                        if (res.data.success == false) {
                            alert('还未分配任务！');
                            $scope.taskinfo = [];
                        }
                        else {
                            $scope.taskinfo = res.data;
                            $scope.task.worktype = 1;
                            //根据切冲焊获取机台
                            flowService.mechineselectbygx($scope.task).then(
                                function (res) {
                                    $scope.mechineinfobygx = res.data;
                                }
                            )
                            // $scope.mechinebygx(1);
                        }
                    }
                )

                //查询所有工人 即group为4的
                flowService.labourselect().then(
                    function (res) {
                        $scope.labour = res.data;
                        for (var i = 0; i < $scope.labour.length; i++) {
                            $scope.username[$scope.labour[i].userid] = $scope.labour[i].username;
                        }
                        console.log($scope.username);
                    }
                )
                //
                flowService.component_types_select(x).then(
                    function (res) {
                        $scope.com_pnt = res.data;
                    }
                )
                //
                flowService.allformwork(x, $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage).then(
                    function (res) {
                        $scope.spinnerbl = true;
                        var toDo = function () {
                            $scope.spinnerbl = false;
                        };
                        $timeout(toDo, 3000);
                        $scope.cutinfo = res.data.data;
                        if ($scope.cutinfo.success == false)
                            alert('该项目还未上传模板');
                        else {
                            //根据项目统计总数
                            flowService.allformwork_sum($scope.project_id).then(
                                function (response) {
                                    $scope.prj_sum = response.data[0].sum;
                                }
                            )
                            $scope.paginationConf.totalItems = res.data.count;
                            for (var c2 = 0; c2 < $scope.cutinfo.length; c2++) {
                                $scope.num = $scope.num + parseInt($scope.cutinfo[c2].num);
                                $scope.ion = $scope.ion + parseInt($scope.cutinfo[c2].ion);
                                $scope.imon = $scope.imon + parseInt($scope.cutinfo[c2].imon);

                                $scope.punched = $scope.punched + parseInt($scope.cutinfo[c2].punched);
                                $scope.no_punched = $scope.no_punched + parseInt($scope.cutinfo[c2].no_punched);

                                $scope.weld = $scope.weld + parseInt($scope.cutinfo[c2].weld);
                                $scope.no_weld = $scope.no_weld + parseInt($scope.cutinfo[c2].no_weld);

                                $scope.material = $scope.material + parseInt($scope.cutinfo[c2].material);
                                $scope.no_material = $scope.no_material + parseInt($scope.cutinfo[c2].no_material);
                                for (var print2 = 0; print2 < $scope.cutinfo[c2].data.length; print2++) {
                                    $scope.taskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].tasked;
                                    $scope.punchtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].punchtasked;
                                    $scope.weldtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].weldtasked;
                                    $scope.feedtaskedbl[$scope.cutinfo[c2].data[print2].id] = $scope.cutinfo[c2].data[print2].feedtasked;
                                }
                            }
                        }
                    });
                $scope.allocate = '2';
            };

            //选择模板--拆分（假如一类模板有很多块想分开来分配任务）
            $scope.modelinfo = function (x, y) {
                $scope.indexc = x;
                $scope.indexcname = y;
                $scope.allowtasedcutnum = $scope.cutinfo[$scope.indexc - 1].num - $scope.cutinfo[$scope.indexc - 1].tasked;
                $scope.allowtasedpunchnum = $scope.cutinfo[$scope.indexc - 1].num - $scope.cutinfo[$scope.indexc - 1].punchtasked;
                $scope.allowtasedweldnum = $scope.cutinfo[$scope.indexc - 1].num - $scope.cutinfo[$scope.indexc - 1].weldtasked;
                $scope.allowtasedfeednum = $scope.cutinfo[$scope.indexc - 1].num - $scope.cutinfo[$scope.indexc - 1].feedtasked;
            };
            //拆分选择模板的时候判断上是否有足够多的模板来满足手动输入的数量
            $scope.cutupdate = function () {
                if ($scope.indexcnum > $scope.allowtasednum)
                    alert('可分配的模板数不足，请重新输入');
                for (var cuttask = 0; cuttask < $scope.cutinfo[$scope.indexc - 1].data.length; cuttask++) {
                    var bl = false;
                    if ($scope.taskedbl[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] == '1') {
                        bl = true;
                    }
                    else {
                        for (var i = 0; i < $scope.tasked.length; i++) {
                            if ($scope.tasked[i].id == $scope.cutinfo[$scope.indexc - 1].data[cuttask].id) {
                                bl = true;
                            }
                        }
                    }
                    if (!bl) {
                        $scope.tasked.push({'id': $scope.cutinfo[$scope.indexc - 1].data[cuttask].id});
                        $scope.indexcnum = $scope.indexcnum - 1;
                    }
                    $scope.cutchosen[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] = (true && ($scope.taskedbl[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] == '0'));
                    if ($scope.indexcnum <= 0)
                        break;
                }
                $scope.indexcnum = 0;
            };
            //同上
            $scope.punchupdate = function () {
                if ($scope.indexcnum > $scope.allowtasednum)
                    alert('可分配的模板数不足，请重新输入');
                for (var cuttask = 0; cuttask < $scope.cutinfo[$scope.indexc - 1].data.length; cuttask++) {
                    var bl = false;
                    if ($scope.punchtaskedbl[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] == '1') {
                        bl = true;
                    }
                    else {
                        for (var i = 0; i < $scope.tasked.length; i++) {
                            if ($scope.tasked[i].id == $scope.cutinfo[$scope.indexc - 1].data[cuttask].id) {
                                bl = true;
                            }
                        }
                    }
                    if (!bl) {
                        $scope.tasked.push({'id': $scope.cutinfo[$scope.indexc - 1].data[cuttask].id});
                        $scope.indexcnum = $scope.indexcnum - 1;
                    }
                    $scope.cutchosen[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] = (true && ($scope.punchtaskedbl[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] == '0'));
                    if ($scope.indexcnum <= 0)
                        break;
                }
                $scope.indexcnum = 0;
            };
            //同上
            $scope.weldupdate = function () {
                if ($scope.indexcnum > $scope.allowtasednum)
                    alert('可分配的模板数不足，请重新输入');
                for (var cuttask = 0; cuttask < $scope.cutinfo[$scope.indexc - 1].data.length; cuttask++) {
                    var bl = false;
                    if ($scope.weldtaskedbl[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] == '1') {
                        bl = true;
                    }
                    else {
                        for (var i = 0; i < $scope.tasked.length; i++) {
                            if ($scope.tasked[i].id == $scope.cutinfo[$scope.indexc - 1].data[cuttask].id) {
                                bl = true;
                            }
                        }
                    }
                    if (!bl) {
                        $scope.tasked.push({'id': $scope.cutinfo[$scope.indexc - 1].data[cuttask].id});
                        $scope.indexcnum = $scope.indexcnum - 1;
                    }
                    $scope.cutchosen[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] = (true && ($scope.weldtaskedbl[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] == '0'));
                    if ($scope.indexcnum <= 0)
                        break;
                }
                $scope.indexcnum = 0;
            };
            //同上
            $scope.feedupdate = function () {
                if ($scope.indexcnum > $scope.allowtasednum)
                    alert('可分配的模板数不足，请重新输入');
                for (var cuttask = 0; cuttask < $scope.cutinfo[$scope.indexc - 1].data.length; cuttask++) {
                    var bl = false;
                    if ($scope.feedtaskedbl[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] == '1') {
                        bl = true;
                    }
                    else {
                        for (var i = 0; i < $scope.tasked.length; i++) {
                            if ($scope.tasked[i].id == $scope.cutinfo[$scope.indexc - 1].data[cuttask].id) {
                                bl = true;
                            }
                        }
                    }
                    if (!bl) {
                        $scope.tasked.push({'id': $scope.cutinfo[$scope.indexc - 1].data[cuttask].id});
                        $scope.indexcnum = $scope.indexcnum - 1;
                    }
                    $scope.cutchosen[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] = (true && ($scope.feedtaskedbl[$scope.cutinfo[$scope.indexc - 1].data[cuttask].id] == '0'));
                    if ($scope.indexcnum <= 0)
                        break;
                }
                $scope.indexcnum = 0;
            };
            //删除任务
            $scope.taskdel = function (x) {
                $scope.task.id = x;
                flowService.taskdelete($scope.task).then(
                    function (res) {
                        $scope.projectselect($scope.project_id);
                        alert('删除成功！');
                    }
                )
            };
            //清空所有操作，选中模板、选中机台等等其他
            $scope.clearselected = function () {
                $scope.slAbl.length = 0;
                $scope.slbl.length = 0;
                $scope.cutchosen.length = 0;
                $scope.tasked.length = 0;
                $scope.conf.length = 0;
                $scope.mechinechosebl = false;
                $scope.mechingtasked.length = 0;
                $scope.taskednum = 0;
            };
            //根据开料冲孔焊接分料来获取对应的机台
            $scope.mechinebygx = function (x) {
                $scope.clearselected();
                $scope.task.worktype = x;
                //根据切冲焊获取机台
                flowService.mechineselectbygx($scope.task).then(
                    function (res) {
                        $scope.mechineinfobygx = res.data;
                    }
                )
                if (x == 1) {
                    for (var i = 0; i < $scope.taskinfo.length; i++) {
                        if ($scope.taskinfo[i].process_id == '1')
                            $scope.taskednum = $scope.taskednum + parseInt($scope.taskinfo[i].num);
                    }
                }
                else if (x == 2) {
                    for (var i = 0; i < $scope.taskinfo.length; i++) {
                        if ($scope.taskinfo[i].process_id == '2')
                            $scope.taskednum = $scope.taskednum + parseInt($scope.taskinfo[i].num);
                    }
                }
                else if (x == 3) {
                    for (var i = 0; i < $scope.taskinfo.length; i++) {
                        if ($scope.taskinfo[i].process_id == '3')
                            $scope.taskednum = $scope.taskednum + parseInt($scope.taskinfo[i].num);
                    }
                }
                else if (x == 4) {
                    for (var i = 0; i < $scope.taskinfo.length; i++) {
                        if ($scope.taskinfo[i].process_id == '4')
                            $scope.taskednum = $scope.taskednum + parseInt($scope.taskinfo[i].num);
                    }
                }
            };
            //任务管理-查看任务单
            $scope.task_sl_for_print = function (x, y, z) {
                flowService.task_select_for_print(x).then(
                    function (res) {
                        $scope.jitainumber = y;
                        $scope.taskindex = z;
                        $scope.task_for_print = res.data;
                        $scope.task_for_print_sum = 0;
                        for (var i = 0; i < $scope.task_for_print.length; i++) {
                            $scope.task_for_print_sum += parseInt($scope.task_for_print[i].num);
                        }
                    }
                )
            };
            //机台全选
            $scope.okok = function () {
                $scope.mechinechosebl = !$scope.mechinechosebl;
                if (!$scope.mechinechosebl) {
                    for (var i = 0; i < $scope.mechineinfobygx.length; i++) {
                        $scope.conf[i] = false;
                    }
                }
                else if ($scope.mechinechosebl) {
                    for (var i = 0; i < $scope.mechineinfobygx.length; i++) {
                        $scope.conf[i] = true;
                    }
                }
            };
            $scope.ok = function (index) {
            }
            //单选机台
            $scope.radiochose = function (x) {
                for (var i = 0; i < $scope.mechineinfobygx.length; i++)
                    $scope.conf[i] = false;
                $scope.conf[x] = true;
            };
            //------------------------开料---------------------------
            //选择开料项目
            $scope.cutselect = function (x) {
                $scope.project_id = x;
                for (var l = 0; l < $scope.prj.length; l++) {
                    if ($scope.prj[l].id == x) {
                        $scope.project_name = $scope.prj[l].name;
                    }
                }
                flowService.cut(x, $rootScope.computer_id, 1).then(
                    function (res) {
                        $scope.cutinfoo = res.data;
                        $scope.num = 0;
                        $scope.ion = 0;
                        $scope.punched = 0;
                        $scope.weld = 0;
                        $scope.feed = 0;
                        if ($scope.cutinfoo.success == false)
                            alert('该项目还未上传模板或者没有分配给你任务');
                        else {
                            for (var c2 = 0; c2 < $scope.cutinfoo.length; c2++) {
                                $scope.num = $scope.num + parseInt($scope.cutinfoo[c2].num);
                                $scope.ion = $scope.ion + parseInt($scope.cutinfoo[c2].ion);

                                for (var print2 = 0; print2 < $scope.cutinfoo[c2].data.length; print2++) {
                                    $scope.printbl1[$scope.cutinfoo[c2].data[print2].id] = $scope.cutinfoo[c2].data[print2].incise;
                                }
                            }
                            $scope.imon = $scope.num - $scope.ion;
                        }
                    });
                document.getElementById("tb1").style.display = 'block';
                document.getElementById("fix1").style.display = 'block';
            };
            //显示开料模板三维图和pdf图纸
            $scope.cutdt = function (x) {
                window.top.frames["viewer1"].loadOneFormwork($scope.cutinfoo[x]['data'][0].id);
                var mynode = document.getElementById("example1");
                if (PDFObject.supportsPDFs) {
                    console.log("Yay, this browser supports inline PDFs.");
                } else {
                    console.log("Boo, inline PDFs are not supported by this browser");
                }
                //PDFObject.embed("/rlerp/1.pdf", mynode);
                PDFObject.embed("/rlerp/Application/Ipm/Common/Pdf/" + $scope.cutinfoo[x]['data'][0].type_id + ".pdf", mynode);
            };
            //打印10张以内
            $scope.printTENs = function () {
                for (var j = 0; j < 10; j++) {
                    for (var k = 0; k < $scope.cutinfoo.length; k++) {
                        for (var i = 0; i < $scope.cutinfoo[k].data.length; i++) {
                            if ($scope.cutinfoo[k].data[i].id == $scope.conf2[j]) {
                                $scope.cutrecord($scope.cutinfoo[k].data[i].id, (k + 1), $scope.cutinfoo[k].data[i].number, $scope.cutinfoo[k].data[i].name);
                                $scope.cutchosen[$scope.conf2[j]] = false;
                            }
                        }
                    }
                }
                $scope.conf2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            };
            //开料<打印>记录
            $scope.cutrecord = function (y, p, p_number, partition) {
                $scope.form = {};
                $scope.form.id = y;
                $scope.form.incise = 1;
                $scope.form.userid = $cookies.get('userid');
                $scope.form.project_id = $scope.project_id;
                console.log($scope.form);
                $http.post($rootScope.ip + "/rlerp/home/storage/postUpdate_Incise", $scope.form, $scope.postCfg).success(
                    function (res) {
                        if (res.error == '998') {
                            $scope.printbl1[y] = 1;
                            alert('已经开料并打印过条码11！');
                        }
                        else {
                            console.log(JSON.stringify(res));
                            $scope.printbl1[y] = 1;
                            $scope.cutinfoo[p - 1].ion = parseInt($scope.cutinfoo[p - 1].ion) + 1;
                            $scope.ion = $scope.ion + 1;
                            if (y.length == 1) {
                                y = '0000000' + y;
                                console.log(y);
                                $scope.printBarcode($scope.project_id, y, p_number, partition);
                            }
                            else if (y.length == 2) {
                                y = '000000' + y;
                                console.log(y);
                                $scope.printBarcode($scope.project_id, y, p_number, partition);
                            }
                            else if (y.length == 3) {
                                y = '00000' + y;
                                console.log(y);
                                $scope.printBarcode($scope.project_id, y, p_number, partition);
                            }
                            else if (y.length == 4) {
                                y = '0000' + y;
                                console.log(y);
                                $scope.printBarcode($scope.project_id, y, p_number, partition);
                            }
                            else if (y.length == 5) {
                                y = '000' + y;
                                console.log(y);
                                $scope.printBarcode($scope.project_id, y, p_number, partition);
                            }
                            else if (y.length == 6) {
                                y = '00' + y;
                                console.log(y);
                                $scope.printBarcode($scope.project_id, y, p_number, partition);
                            }
                            else if (y.length == 7) {
                                y = '0' + y;
                                console.log(y);
                                $scope.printBarcode($scope.project_id, y, p_number, partition);
                            }
                            else if (y.length == 8) {
                                console.log(y);
                                $scope.printBarcode($scope.project_id, y, p_number, partition);
                            }
                        }
                    }).error(
                    function (e) {
                        alert(e.toString());
                    });
            };
            //通用打印函数
            $scope.printsetting = function () {
                LODOP = getLodop();
                //LODOP.PREVIEW();
            }
            $scope.printBarcode = function (str, str2, str3, str4) {//项目编号、模板编号、模板类型、分区
                console.log(str);
                console.log(str2);
                console.log(str3);
                console.log(str4);
                $("#bcTarget").barcode(str + '-' + str2, "code128");
                LODOP = getLodop();
                LODOP.PRINT_INIT('打印控件功能演示_Lodop功能_表单一');
                LODOP.SET_PRINT_STYLE("FontSize", 18);
                LODOP.SET_PRINT_STYLE("Bold", 1);
                LODOP.ADD_PRINT_TEXT(30, 120, 2000, 2000, '广东博恒金属制品有限公司');
				LODOP.ADD_PRINT_IMAGE(100,240,600,250,"<img border='0' src='C:/Users/Ryan/Desktop/bh.png' />");
				LODOP.SET_PRINT_STYLEA(0,"Stretch",1);//(可变形)扩展缩放模式
				
                if (str3.length > 25) {
                    LODOP.SET_PRINT_STYLE("FontSize", 14);
                    LODOP.SET_PRINT_STYLE("Bold", 0);
                    //LODOP.ADD_PRINT_TEXT(80, 110, 2000, 2000, str4 + ' ' + str3);
                    LODOP.ADD_PRINT_TEXT(60, 50, 2000, 2000, $scope.project_name + '-' + str3.substring(0, 25));

                }
                else if (str3.length < 14) {
                    LODOP.SET_PRINT_STYLE("FontSize", 16);
                    LODOP.SET_PRINT_STYLE("Bold", 0);
                    //LODOP.ADD_PRINT_TEXT(80, 110, 2000, 2000, str4 + ' ' + str3);
                    LODOP.ADD_PRINT_TEXT(60, 135, 2000, 2000, $scope.project_name + '-' + str3.substring(0, 25));

                }
                else {
                    LODOP.SET_PRINT_STYLE("FontSize", 16);
                    LODOP.SET_PRINT_STYLE("Bold", 0);
                    //LODOP.ADD_PRINT_TEXT(80, 110, 2000, 2000, str4 + ' ' + str3);
                    LODOP.ADD_PRINT_TEXT(60, 40, 2000, 2000, $scope.project_name + '-' + str3.substring(0, 25));

                }
                LODOP.SET_PRINT_STYLE("FontSize", 14);
                LODOP.SET_PRINT_STYLE("Bold", 0);
                //LODOP.ADD_PRINT_TEXT(80, 110, 2000, 2000, str4 + ' ' + str3);
                LODOP.ADD_PRINT_TEXT(85, 115, 2000, 2000, str3.substring(25, 80));

                //LODOP.SET_PRINT_STYLE("FontSize", 16);
                //LODOP.SET_PRINT_STYLE("Bold", 0);
                //LODOP.ADD_PRINT_TEXT(165, 120, 2000, 2000, str + '-' + str2);

                LODOP.ADD_PRINT_HTM(140, 50, 200, 200, document.getElementById("bcTarget").innerHTML);
                //LODOP.ADD_PRINT_IMAGE(30, 20, 200, 200, "<img border='0' src='/rlerp/Public/image/BH.jpg' />");
				LODOP.PREVIEW();//打印预览
                //LODOP.PRINT();//不预览，直接打印
            }


            //记录每条开料或者重置
            $scope.resetrecord = function (y, p) {
                $scope.form = {};
                $scope.form.id = y;
                $scope.form.incise = 0;
                $scope.form.project_id = $scope.project_id;
                $http.post($rootScope.ip + "/rlerp/home/storage/postUpdate_Incise", $scope.form, $scope.postCfg).success(
                    function (res) {
                        if (res.error == '999') {
                            $scope.printbl1[y] = 0;
                            alert('已经是重置状态！');
                        }
                        else {
                            $scope.printbl1[y] = 0;
                            $scope.ion = $scope.ion - 1;
                            $scope.cutinfoo[p - 1].ion = parseInt($scope.cutinfoo[p - 1].ion) - 1;
                            $scope.cutinfoo[p - 1].imon = parseInt($scope.cutinfoo[p - 1].imon) + 1;
                        }
                    }).error(
                    function (e) {
                        alert(e.toString());
                    });
            };
            //打印记录10条，记录要打印的模板信息
            $scope.printselect = function (y) {
                $scope.PRINTbl[y] = !$scope.PRINTbl[y];
                switch ($scope.PRINTbl[y]) {
                    case true:
                        var selected = false;
                        for (var i = 0; i < 10; i++) {
                            if ($scope.conf[i] == y) {
                                selected = true;
                            }
                        }
                        if (!selected) {
                            for (var j = 0; j < 10; j++) {
                                if ($scope.conf2[j] == 0) {
                                    $scope.conf2[j] = y;
                                    $scope.cutchosen[y] = true;
                                    break;
                                }

                                if (j >= 9) {
                                    $scope.PRINTbl[y] = !$scope.PRINTbl[y];
                                    alert('不能超过10个');
                                    break;
                                }
                            }
                        }
                        break;
                    case false:
                        for (var i = 0; i < 10; i++) {
                            if ($scope.conf2[i] == y) {
                                $scope.conf2[i] = 0;
                            }
                        }
                        $scope.cutchosen[y] = false;
                        break;
                }
                console.log($scope.conf2);
            };
            //-------------------------冲孔--------------------------
            //冲孔根据项目id获取清单
            $scope.punchselect = function (x) {
                $scope.project_id = x;
                flowService.punching(x, $rootScope.computer_id, 2).then(
                    function (res) {
                        $scope.punchinginfo = res.data;
                        $scope.num = 0;
                        $scope.ion = 0;
                        $scope.punched = 0;
                        $scope.weld = 0;
                        $scope.feed = 0;
                        for (var p = 0; p < $scope.punchinginfo.length; p++) {
                            $scope.num += parseInt($scope.punchinginfo[p].num);
                            $scope.ion += parseInt($scope.punchinginfo[p].ion);
                            $scope.punched += parseInt($scope.punchinginfo[p].punched);
                            for (var p22 = 0; p22 < $scope.punchinginfo[p].data.length; p22++) {
                                $scope.punchrc1[$scope.punchinginfo[p].data[p22].id] = $scope.punchinginfo[p].data[p22].punch;
                            }
                        }
                    });
                document.getElementById("tb2").style.display = 'block';
                document.getElementById("fix2").style.display = 'block';
            };
            //记录每条冲孔信息
            $scope.punchrecord = function (y, x) {
                $scope.project_id = x;
                $scope.form = {};
                $scope.form.id = y;
                $scope.form.userid = $cookies.get('userid');
                console.log($scope.project_id);
                $scope.form.project_id = $scope.project_id;

                $http.post($rootScope.ip + "/rlerp/home/storage/postUpdate_punch", $scope.form, $scope.postCfg).success(
                    function (res) {
                        if (res.error == '997') {
                            document.getElementById("labelmsg").style.display = 'none';
                            document.getElementById("labelmsg2").style.display = 'block';
                        }
                        if (res.error == null) {
                            $scope.printbl1[y] = 1;
                            $scope.punchrc1[y] = 1;
                            $scope.punchselect(x);
                            document.getElementById("labelmsg").style.display = 'block';
                            document.getElementById("labelmsg2").style.display = 'none';
                        }
                    }).error(
                    function (e) {
                        alert(e.toString());
                    });

            };
            //冲孔扫描-e.keyCode判断是否按下回车enter键
            $scope.punchingscan = function (e) {
                console.log("Event type: " + e.keyCode);
                if (e.keyCode == 13) {
                    var toDo = function () {
                        $scope.scannid = $scope.scanner.ad.split('-')[1];
                        console.log('prjid' + $scope.scanner.ad.split('-')[0] + 'no' + $scope.scanner.ad.split('-')[1]);
                        $scope.punchrecord($scope.scanner.ad.split('-')[1], $scope.scanner.ad.split('-')[0]);
                        //window.top.frames["viewer2"].loadOneFormwork($scope.scannid);
                        $scope.scanner.ad = "";
                    };
                    $timeout(toDo, 1500);
                }
                else if (e.keycode != 13) {
                    document.getElementById("labelmsg").style.display = 'none';
                    document.getElementById("labelmsg2").style.display = 'none';
                }
            };
            //显示冲孔模板的三维图和pdf图纸
            $scope.punchdt = function (x) {
                window.top.frames["viewer2"].loadOneFormwork($scope.punchinginfo[x]['data'][0].id);
                var mynode = document.getElementById("example2");
                PDFObject.embed("/rlerp/Application/Ipm/Common/Pdf/" + $scope.punchinginfo[x]['data'][0].type_id + ".pdf", mynode);
            };
            //-------------------------焊接--------------------------
            //焊接根据项目id获取清单
            $scope.jointingselect = function (x) {
                $scope.project_id = x;
                flowService.jointing(x, $rootScope.computer_id, 3).then(
                    function (res) {
                        $scope.jointinginfo = res.data;
                        $scope.num = 0;
                        $scope.ion = 0;
                        $scope.punched = 0;
                        $scope.weld = 0;
                        $scope.feed = 0;
                        for (var j = 0; j < $scope.jointinginfo.length; j++) {
                            $scope.num += parseInt($scope.jointinginfo[j].num);
                            $scope.ion += parseInt($scope.jointinginfo[j].ion);
                            $scope.punched += parseInt($scope.jointinginfo[j].punched);
                            $scope.weld += parseInt($scope.jointinginfo[j].weld);
                            for (var j22 = 0; j22 < $scope.jointinginfo[j].data.length; j22++) {
                                $scope.weldrc1[$scope.jointinginfo[j].data[j22].id] = $scope.jointinginfo[j].data[j22].weld;
                            }
                        }
                    });
                document.getElementById("tb3").style.display = 'block';
                document.getElementById("fix3").style.display = 'block';
            };
            //记录每条焊接
            $scope.jointrecord = function (y, x) {
                $scope.project_id = x;
                $scope.form = {};
                $scope.form.id = y;
                $scope.form.userid = $cookies.get('userid');
                $scope.form.project_id = $scope.project_id;
                $http.post($rootScope.ip + "/rlerp/home/storage/postUpdate_Weld", $scope.form, $scope.postCfg).success(
                    function (res) {
                        if (res.error == '996') {

                            document.getElementById("labelmsg").style.display = 'none';
                            document.getElementById("labelmsg2").style.display = 'block';
                        }
                        if (res.error == null) {
                            $scope.printbl1[y] = 1;
                            $scope.punchrc1[y] = 1;
                            $scope.weldrc1[y] = 1;
                            $scope.jointingselect(x);
                            document.getElementById("labelmsg").style.display = 'block';
                            document.getElementById("labelmsg2").style.display = 'none';
                        }
                    }).error(
                    function (e) {
                        alert(e.toString());
                    });
            };
            //焊接扫描
            $scope.jointingscan = function (e) {
                console.log("Event type: " + e.keyCode);
                if (e.keyCode == 13) {
                    var toDo = function () {
                        console.log($scope.scanner.ad.split('-')[0]);
                        $scope.jointrecord($scope.scanner.ad.split('-')[1], $scope.scanner.ad.split('-')[0]);
                        $scope.scannid = $scope.scanner.ad.split('-')[1];
                        //window.top.frames["viewer3"].loadOneFormwork($scope.scannid);
                        $scope.scanner.ad = "";
                    };
                    $timeout(toDo, 1500);
                }
                else if (e.keyCode != 13) {
                    document.getElementById("labelmsg").style.display = 'none';
                    document.getElementById("labelmsg2").style.display = 'none';
                }
            };
            //显示焊接模板的三维图和pdf图纸
            $scope.jointdt = function (x) {
                window.top.frames["viewer3"].loadOneFormwork($scope.jointinginfo[x]['data'][0].id);
                var mynode = document.getElementById("example3");
                PDFObject.embed("/rlerp/Application/Ipm/Common/Pdf/" + $scope.jointinginfo[x]['data'][0].type_id + ".pdf", mynode);
            };
            //-------------------------分料--------------------------
        //分料选择项目
            $scope.feedselect = function (x) {
                $scope.project_id = x;
                for (var i = 0; i < $scope.prjNew.length; i++) {
                    if ($scope.prjNew[i].id == x) {
                        $scope.project_name = $scope.prjNew[i].name;
                        break;
                    }
                }
                flowService.getNoMaterial($scope.project_id).then(
                    function (res) {
                        $scope.no_material_detail = res.data;
                    }
                )
                // flowService.feeding(x, $rootScope.computer_id, 4).then(
                //     function (res) {
                //         $scope.feedinginfo = res.data;
                //         $scope.num = 0;
                //         $scope.ion = 0;
                //         $scope.punched = 0;
                //         $scope.weld = 0;
                //         $scope.feed = 0;
                //         for (var j = 0; j < $scope.feedinginfo.length; j++) {
                //             $scope.num += parseInt($scope.feedinginfo[j].num);
                //             $scope.ion += parseInt($scope.feedinginfo[j].ion);
                //             $scope.punched += parseInt($scope.feedinginfo[j].punched);
                //             $scope.weld += parseInt($scope.feedinginfo[j].weld);
                //             $scope.feed += parseInt($scope.feedinginfo[j].material);
                //             for (var j22 = 0; j22 < $scope.feedinginfo[j].data.length; j22++) {
                //                 $scope.feedrc1[$scope.feedinginfo[j].data[j22].id] = $scope.feedinginfo[j].data[j22].material;
                //             }
                //         }
                //         console.log($scope.feedrc1);
                //     });
                //document.getElementById("tb4").style.display = 'block';
                //document.getElementById("fix4").style.display = 'block';
            };
            //记录每条分料信息
            $scope.feedrecord = function (y, x) {
                $scope.project_id = x;
                $scope.form = {};
                $scope.form.id = y;
                $scope.form.userid = $cookies.get('userid');
                $scope.form.project_id = $scope.project_id;
                $http.post($rootScope.ip + "/rlerp/home/storage/postUpdate_Material", $scope.form, $scope.postCfg).success(
                    function (res) {
                        if (res.error == '996') {
                            document.getElementById("labelmsg").style.display = 'none';
                            document.getElementById("labelmsg2").style.display = 'block';
                        }

                        if (res.error == null) {
                            $scope.printbl1[y] = 1;
                            $scope.punchrc1[y] = 1;
                            $scope.weldrc1[y] = 1;
                            $scope.feedrc1[y] = 1;
                            //$scope.feedselect(x);
                            document.getElementById("labelmsg").style.display = 'block';
                            document.getElementById("labelmsg2").style.display = 'none';
                        }
                    }).error(
                    function (e) {
                        alert(e.toString());
                    });
            };
            //分料扫描
            $scope.feedingscan = function (e) {
                console.log("Event type: " + e.keyCode);
                if (e.keyCode == 13) {
                    var toDo = function () {
                        console.log($scope.scanner.ad.split('-')[0]);
                        $scope.feedrecord($scope.scanner.ad.split('-')[1], $scope.scanner.ad.split('-')[0]);
                        $scope.scannid = $scope.scanner.ad.split('-')[1];
                        //window.top.frames["viewer4"].loadOneFormwork($scope.scannid);
                        $scope.scanner.ad = "";
                    }
                    $timeout(toDo, 1500);
                }
                else if (e.keycode != 13) {
                    document.getElementById("labelmsg").style.display = 'none';
                    document.getElementById("labelmsg2").style.display = 'none';
                }
            };
            //显示分料模板的三维图和pdf图纸
            $scope.feeddt = function (x) {
                window.top.frames["viewer4"].loadOneFormwork($scope.feedinginfo[x]['data'][0].id);
                var mynode = document.getElementById("example4");
                PDFObject.embed("/rlerp/Application/Ipm/Common/Pdf/" + $scope.feedinginfo[x]['data'][0].type_id + ".pdf", mynode);
            };

            //焦点focus
            $scope.focus = function () {
                //$('#scan').focus();
                $scope.scanner.ad = "";
                document.getElementById("labelmsg").style.display = 'none';
                document.getElementById("labelmsg2").style.display = 'none';
            };
            $('.table-expandable').each(function () {
                var table = $(this);
                table.children('thead').children('tr').append('<th></th>');
                table.children('tbody').children('tr').filter(':odd').hide();
                table.children('tbody').children('tr').filter(':even').click(function () {
                    var element = $(this);
                    element.next('tr').toggle('slow');
                    element.find(".table-expandable-arrow").toggleClass("up");
                });
                table.children('tbody').children('tr').filter(':even').each(function () {
                    var element = $(this);
                    element.append('<td><div class="table-expandable-arrow"></div></td>');
                });
            });
            //导出Excel
            $scope.exportToExcel = function () {
                var time = new Date();
                if (time.getMonth() < 9)
                    var month = '0' + (time.getMonth() + 1).toString();
                else
                    var month = (time.getMonth() + 1).toString();
                if (time.getDate() <= 9)
                    var date = '0' + time.getDate().toString();
                else
                    var date = time.getDate().toString();
                if (time.getHours() <= 9)
                    var hour = '0' + time.getHours().toString();
                else
                    var hour = time.getHours().toString();
                if (time.getMinutes() <= 9)
                    var minute = '0' + time.getMinutes().toString();
                else
                    var minute = time.getMinutes().toString();
                if (time.getSeconds() <= 9)
                    var second = '0' + time.getSeconds().toString();
                else
                    var second = time.getSeconds().toString();

                $(".table2excel").table2excel({
                    exclude: ".noExl",  // 不想导出的行加上class='noExl'即可
                    name: "20160906", // excel sheetname好像不起作用~~~
                    filename: $scope.jitainumber + '-' + $scope.taskindex + "清单",
                    //+ time.getFullYear().toString() + '-' + month + date + '-' + hour + minute + second, // excel文件名
                    fileext: ".xls",//文件格式
                    exclude_img: false,//图片
                    exclude_links: true,//链接
                    exclude_inputs: true//输入
                });
            };
            //导出Excel
            $scope.exportToExcel2 = function () {
                var selectobj = document.getElementById('inputprj');
                var time = new Date();
                if (time.getMonth() < 9)
                    var month = '0' + (time.getMonth() + 1).toString();
                else
                    var month = (time.getMonth() + 1).toString();
                if (time.getDate() <= 9)
                    var date = '0' + time.getDate().toString();
                else
                    var date = time.getDate().toString();
                if (time.getHours() <= 9)
                    var hour = '0' + time.getHours().toString();
                else
                    var hour = time.getHours().toString();
                if (time.getMinutes() <= 9)
                    var minute = '0' + time.getMinutes().toString();
                else
                    var minute = time.getMinutes().toString();
                if (time.getSeconds() <= 9)
                    var second = '0' + time.getSeconds().toString();
                else
                    var second = time.getSeconds().toString();
                $(".table2excel1").table2excel({
                    exclude: ".noExl",  // 不想导出的行加上class='noExl'即可
                    name: "20160906", // excel sheetname好像不起作用~~~
                    filename: selectobj.options[selectobj.selectedIndex].text + "生产清单-" + $scope.paginationConf.currentPage,
                    //+ time.getFullYear().toString() + '-' + month + date + '-' + hour + minute + second, // excel文件名
                    fileext: ".xls",//文件格式
                    exclude_img: false,//图片
                    exclude_links: true,//链接
                    exclude_inputs: true//输入
                });
            };
            //导出exccel
            $scope.exportToExcel3 = function () {
                var time = new Date();
                if (time.getMonth() < 9)
                    var month = '0' + (time.getMonth() + 1).toString();
                else
                    var month = (time.getMonth() + 1).toString();
                if (time.getDate() <= 9)
                    var date = '0' + time.getDate().toString();
                else
                    var date = time.getDate().toString();
                if (time.getHours() <= 9)
                    var hour = '0' + time.getHours().toString();
                else
                    var hour = time.getHours().toString();
                if (time.getMinutes() <= 9)
                    var minute = '0' + time.getMinutes().toString();
                else
                    var minute = time.getMinutes().toString();
                if (time.getSeconds() <= 9)
                    var second = '0' + time.getSeconds().toString();
                else
                    var second = time.getSeconds().toString();

                $(".table2excel").table2excel({
                    exclude: ".noExl",  // 不想导出的行加上class='noExl'即可
                    name: "20160906", // excel sheetname好像不起作用~~~
                    filename: $scope.project_name + "未分料清单",
                    //+ time.getFullYear().toString() + '-' + month + date + '-' + hour + minute + second, // excel文件名
                    fileext: ".xls",//文件格式
                    exclude_img: false,//图片
                    exclude_links: true,//链接
                    exclude_inputs: true//输入
                });
            };
            /*$scope.ExportToExcel = function () {
             var elTable = document.getElementById("tableServer"); //你的tableID
             var oRangeRef = document.body.createTextRange();
             oRangeRef.moveToElementText(elTable);
             oRangeRef.execCommand("Copy");
             try {
             var appExcel = new ActiveXObject("Excel.Application");
             } catch (e) {
             alert("If you change your mind, refresh your page  and select 'yes' to download excel.");
             return;
             }
             appExcel.Visible = true;
             appExcel.Workbooks.Add().Worksheets.Item(1).Paste();
             appExcel = null;
             }
             $scope.ProductExportToExcel = function () {
             var elTable = document.getElementById("tableProduct"); //tableID
             var oRangeRef = document.body.createTextRange();
             oRangeRef.moveToElementText(elTable);
             oRangeRef.execCommand("Copy");
             try {
             var appExcel = new ActiveXObject("Excel.Application");
             } catch (e) {
             alert("If you change your mind, refresh your page  and select 'yes' to download excel.");
             return;
             }
             appExcel.Visible = true;
             appExcel.Workbooks.Add().Worksheets.Item(1).Paste();
             appExcel = null;
             }*/
            $scope.scrollon = function () {
                //启用滚动条
                $(document.body).css({
                    "overflow-x": "auto",
                    "overflow-y": "auto"
                });
            }
        }
    )
;
productModule.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
            return $window.btoa(unescape(encodeURIComponent(s)));
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = {worksheet: worksheetName, table: table.html()},
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
});

