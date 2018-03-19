var storageModule = angular.module('StorageModule', []);
storageModule.controller('storageCtrl',function ($scope,$http) {
    //页面分页控制变量
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 22,
        itemsPerPage: 10,
        pagesLength: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        /*onChange: function () {
         }*/
    };
    $scope.instorage={};
    $scope.profileadd={

    };
    $scope.kboardadd={

    };
    $scope.bl=true;//页面刷新变量
    //页面刷新function
    $scope.pageChange = function () {
        if($scope.bl==false)
            $scope.bl=true;
        else $scope.bl=false;
        console.log($scope.bl);
    }
    //POST包头
    $scope.postCfg = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (data) {
            return $.param(data);
        }
    };
    //监听页面事件变化
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage + totalItems +bl', function (newValue, oldValue, scope) {
        //获取型材库存
        $http.get("/rlerp/Home/Storage/get_Profile/").success(
            function (response) {
                $scope.profile = response;
                $scope.paginationConf.totalItems = response.count;
            }).error(
            function () {
                alert("获取型材库存信息失败！");
            }
        );
        //获取卡板信息
        $http.get("/rlerp/Home/Storage/get_KBoard/").success(
            function (response) {
                $scope.KBoard = response;
                $scope.paginationConf.totalItems = response.count;
            }).error(
            function () {
                alert("获取卡板信息失败！");
            }
        );
    });

    //添加库存
    $scope.addsum = function () {
        $http.post("/rlerp/Home/Storage/add_ProfileSum/",$scope.instorage,$scope.postCfg).success(function () {
            $scope.pageChange();
        }).error(
            function () {

            }
        )
    }
    //添加型材类型
    $scope.addprofile = function () {
        $http.post("/rlerp/Home/Storage/add_Profile/",$scope.profileadd,$scope.postCfg).success(function () {
            $scope.pageChange();
        }).error(
            function () {

            }
        )
    }
    //删除型材类型
    $scope.delprofile = function (name) {
        $scope.instorage.name=name;
        $http.post("/rlerp/Home/Storage/del_Profile/",$scope.instorage,$scope.postCfg).success(function () {
            $scope.pageChange();
            $scope.instorage={};
        }).error(
            function () {

            }
        )
    }
    //新增卡板
    $scope.addkboard = function () {
        $http.post("/rlerp/Home/Storage/add_KBoard",$scope.kboardadd,$scope.postCfg).success(function () {
            $scope.pageChange();
            $scope.kboardadd={};
        }).error(
            function () {

            }
        )
    }
    //删除卡板
    $scope.delkboard = function (name) {
        $scope.kboardadd.name=name;
        $http.post("/rlerp/Home/Storage/",$scope.kboardadd,$scope.postCfg).success(function () {
            $scope.pageChange();
            $scope.kboardadd={};
        }).error(
            function () {

            }
        )
    }
    //修改卡板
    $scope.altkboard = function () {

        $http.post("/rlerp/Home/Storage/",$scope.instorage,$scope.postCfg).success(function () {
            $scope.pageChange();
            $scope.kboardadd={};
        }).error(
            function () {

            }
        )
    }
})