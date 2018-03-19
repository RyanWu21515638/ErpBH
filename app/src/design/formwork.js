var formworkApp = angular.module('formworkApp', ['tm.pagination']);
formworkApp
    .directive('xpopover', function () {
        return function (scope, element) {
            $(element).popover(
                {
                    html: true
                }
            );
        }

    })
    .directive('qrcode', function () {

        return function (scope, element ,attrs) {
            $(element).qrcode(
                {
                    render: "div",
                    width: 80, //宽度
                    height: 80, //高度
                    text: "id:"+scope.x.id+";type:"+scope.x.type //任意内容
                }
            );
        }

    })
    .controller('formworkController', function ($scope, $rootScope, $http, $state) {
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 22,
            itemsPerPage: 10,
            pagesLength: 10,
            perPageOptions: [10, 20, 30, 40, 50],
            onChange: function () {

            }
        };
        $scope.partion;
        $scope.prjid;
        $scope.pckage;
        $scope.formnumber;
        $http.get('/rlerp/Home/Project?company_id=1').success(
            function (res) {
                if (res) {
                    $scope.prj = res;
                }
                else {
                    alert("error");
                }
            }).error(function () {
            alert("an unexpected error ocurred!");
        });

        $scope.toggle = function () {
            $scope.myVar = false;
        }

        $scope.change1 = function (x) {
            console.log(x);
            $http.get('/rlerp/Home/Partition?prj_id=' + x).success(
                function (res) {
                    if (res) {
                        $scope.part = res;
                        var time=new Date();
                        if(time.getMonth()<=9)
                            var month='0'+(time.getMonth()+1).toString();
                        else
                            var month=(time.getMonth()+1).toString();
                        if(time.getDate()<=9)
                            var date='0'+time.getDate().toString();
                        else
                            var date=time.getDate().toString();
                        if(time.getHours()<=9)
                            var hour='0'+time.getHours().toString();
                        else
                            var hour=time.getHours().toString();
                        if(time.getMinutes()<=9)
                            var minute='0'+time.getMinutes().toString();
                        else
                            var minute=time.getMinutes().toString();
                        if(time.getSeconds()<=9)
                            var second='0'+time.getSeconds().toString();
                        else
                            var second=time.getSeconds().toString();
                        //生成订单编号，可设置格式或者前缀
                        $scope.orderid = time.getFullYear().toString()+month+date+hour+minute+second;
                    }
                    else {
                        alert("error1");
                    }
                }).error(function () {
                alert("an unexpected error ocurred!");
            });
        }
        $scope.change2 = function (x) {
            console.log(x);
            $http.get('/rlerp/Home/Package?partition_id=' + x).success(
                function (res) {
                    if (res) {
                        $scope.pack = res;
                    }
                    else {
                        alert("error2");
                    }
                }).error(function () {
                alert("an unexpected error ocurred!");
            });
        }
        $scope.change3 = function (x) {

            $scope.pckageid = x;
            console.log($scope.pckageid);

            $http.get('/rlerp/Home/Formwork/groupInfo?package_id=' + x).success(
                function (res) {
                    if (res) {
                        $scope.group = res;

                        document.getElementById("div1").style.visibility = "visible";
                    }
                    else {
                        alert("error3");
                    }
                }).error(function () {
                alert("an unexpected error ocurred!");
            });

        }
        $scope.detail = function (x, y) {
            console.log(x);
            console.log(y);
            $scope.formnumber = y;
            $http.get('/rlerp/Home/Formwork/groupDetail?', {
                    params: {
                        package_id: $scope.pckageid,
                        type_id: x,
                        currentPage: $scope.paginationConf.currentPage,
                        itemsPerPage: $scope.paginationConf.itemsPerPage
                    }
                }
            ).success(
                function (res) {
                    if (res) {
                        $scope.formdetail = res;
                        document.getElementById("div2").style.visibility = "visible";
                    }
                    else {
                        alert("error4");
                    }
                }).error(function () {
                alert("an unexpected error ocurred!");
            });
        }
        $scope.sendmail = function () {
            $http.get('/rlerp/Home/PostMail/addmail/').success(
                function (res) {
                    if (res) {
                    }
                    else {
                    }
                }).error(function () {
                alert("an unexpected error ocurred!");
            });
        }

        $scope.print= function () {
            $("#table").jqprint({debug:false});

        }
        $scope.generatecode = function (str) {
            /*$("#ddd").qrcode(
                {
                    width: 200, //宽度
                    height: 200, //高度
                    text: str //任意内容
                });*/
            //$("#ddd").qrcode.clear);
        }

    });
	
		