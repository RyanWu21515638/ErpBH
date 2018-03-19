var formApp = angular.module('formApp', ['ngCookies']);
formApp
    .controller('formController', function ($scope, $http, $state, $window, $cookies, $rootScope, $timeout, flowService) {
        $scope.formData = {};
        $scope.isAuthenticated = false;
        $scope.storage = $cookies.get('userid');
        //$rootScope.topbarbl = $cookies.get('topbarbl');
        $scope.cook = function () {
            console.log($cookies.get('username') + ',' + $cookies.get('password'));
            console.log($cookies.get('userid') + ',' + $cookies.get('userrole'));
        }
        $scope.postCfg = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            }
        };
        //登出
        $scope.logout = function () {
            alert('您正在退出登录，请重新登录!');
            $scope.formData.userid = $cookies.get('userid');
            $http.post($rootScope.ip + "/rlerp/home/user/exit_login", $scope.formData, $scope.postCfg).success(
                function (res) {
                    $state.go("index");
                }).error(function (e) {
                    alert(e.toString());
                }
            )
            $cookies.remove('username');
            $cookies.remove('password');
            $cookies.remove('userid');
            $cookies.remove('userrole');
            $cookies.remove('prjid');
            $cookies.remove('prjname');
            $cookies.remove('processID');
            //$cookies.remove('topbarbl');
        }
        $scope.userscan = function (e) {
            if (e.keyCode == 13) {
                var toDo = function () {
                    console.log($scope.formData.username);
                }
                $timeout(toDo, 1500);

            }
        }
        //登录
        $scope.login = function () {
            $http.post($rootScope.ip + "/rlerp/home/user/loginPOST", $scope.formData, $scope.postCfg).success(
                function (user) {
                    if (user.success) {

                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 1);
                        $cookies.put('userid', user.data.id, {'expires': expireDate});
                        $cookies.put('username', user.data.username, {'expires': expireDate});
                        $cookies.put('password', user.data.password, {'expires': expireDate});
                        $cookies.put('userrole', user.data.usergroup, {'expires': expireDate});

                        flowService.mechineselect().then(
                            function (res) {
                                $scope.mechineinfo = res.data;
                                for (var i = 0; i < $scope.mechineinfo.length; i++) {
                                    if ($scope.mechineinfo[i].number == $rootScope.computer_id_noencode) {
                                        $cookies.put('processID', $scope.mechineinfo[i].process_id, {'expires': expireDate});
                                        break;
                                    }
                                }
                                if ($cookies.get('processID') == '1') {
                                    //$rootScope.topbarbl = true;
                                    $state.go('main.productmng.cutinfo');
                                }
                                else if ($cookies.get('processID') == '2') {
                                    ///$rootScope.topbarbl = false;
                                    $state.go('main.productmng.punchinginfo');
                                }
                                else if ($cookies.get('processID') == '3') {
                                    //$rootScope.topbarbl = false;
                                    $state.go('main.productmng.jointinginfo');
                                }
                                else if ($cookies.get('processID') == '4') {
                                    //$rootScope.topbarbl = false;
                                    $state.go('main.productmng.package');
                                }
                                else {
                                    //$rootScope.topbarbl = true;
                                    //$cookies.put('topbarbl', true, {'expires': expireDate});
                                    console.log('xyxyxyx');
                                    $state.go('main');
                                }
                            }
                        );


                        return user.data;
                    }
                    if (!user.success) {
                        if (user.message == 'fail')
                            alert("用户名或者密码错误，请确认重新登录");
                        if (user.errors.username == 'Name is required.')
                            alert("请输入用户名！");
                        else if (user.errors.password == 'password is required.')
                            alert("请输入密码！");
                    }
                }).error(
                function (e) {
                    alert(e.toString());
                });
        }
        $scope.todoSomething = function ($event) {
            if ($event.keyCode == 13) {//回车
                $scope.login();
            }
        }
    })

    //权限认证
    .factory('AuthService', function ($http, $cookies) {
        var authService = {};
        /*authService.login = function (credentials) {
         return $http
         .post('/login', credentials)
         .then(function (res) {
         Session.create(res.data.id, res.data.user.id,
         res.data.user.role);
         return res.data.user;
         });
         };*/
        authService.isAuthenticated = function () {
            return !!$cookies.get('userid');

        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            console.log('index' + authorizedRoles.indexOf($cookies.get('userrole')));
            return (authService.isAuthenticated() &&
            authorizedRoles.indexOf($cookies.get('userrole')) !== -1);
        };
        return authService;

    })

;
		