var routerApp = angular.module('routerApp', ['ui.router', 'formApp', 'formworkApp','UserModule','StorageModule','productModule','myApp','chartModule','mechine']);


/**
 *routerApp全局路由
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
routerApp
    //角色权限
    .constant('USER_ROLES', {
        all: '*',
        admin: '1',
        productmng: '2',
        designer: '3',
        productor:'4',
        null: ''
    })
    //所有页面路由
    .config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('warning', {
                url: '/warning',
                templateUrl: '/rlerp/Application/Home/View/warn/warning.html'
            })
            .state('setting', {
                url: '/setting',
                templateUrl: '/rlerp/Application/Home/View/setting/setting.html',
                data: {
                    authorizedRoles: [USER_ROLES.null,USER_ROLES.all, USER_ROLES.admin, USER_ROLES.designer, USER_ROLES.productmng, USER_ROLES.productor]
                }
            })
            .state('index', {
                url: '/index',
                views: {
                    '': {
                        templateUrl: 'tpls/login/home.html'
                    },
                    'login@index': {
                        templateUrl: 'tpls/login/loginForm.html'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.null,USER_ROLES.all, USER_ROLES.admin, USER_ROLES.designer, USER_ROLES.productmng, USER_ROLES.productor]
                }
            })
            .state('main', {
                url: '/main',
                views: {
                    '': {
                        templateUrl: 'tpls/main/main.html'
                    },
                    'topbar@main': {
                        templateUrl: 'tpls/main/topbar.html'
                    },/*
                    'content@main': {
                        templateUrl: 'tpls/system/sysmng.html'
                    }
                    ,*/
                    'content@main':{
                        templateUrl: 'tpls/product/producehighchart.html',
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.null,USER_ROLES.all, USER_ROLES.admin, USER_ROLES.designer, USER_ROLES.productmng, USER_ROLES.productor]
                }
            })
            //系统管理
            .state('main.sysmng', {
                url: '/sysmng',
                views: {
                    'content@main': {
                        templateUrl: 'tpls/system/sysmng.html'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
                }

            })
            .state('main.sysmng.userinfo', {
                url: '/userinfo',
                templateUrl: 'tpls/system/userinfo.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.productmng]
                }
            })
            .state('main.sysmng.usersetting', {
                url: '/usersetting',
                templateUrl: 'tpls/system/usersetting.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.productor,USER_ROLES.designer,USER_ROLES.productmng]
                }
            })
            //生产管理
            .state('main.productmng',{
                url:'/productmng',
                views:{
                    'content@main':{
                        templateUrl:'tpls/product/productmng.html'
                    }
                }
            })
            //test
            .state('main.productmng.test',{
                url:'/test',
                templateUrl:'tpls/product/test.html'
            })
            //统计
            .state('main.productmng.producehighchart',{
                url:'/producehighchart',
                templateUrl:'tpls/product/producehighchart.html'
            })
            //test2
            .state('main.productmng.workflowinfo',{
                url:'/workflowinfo',
                templateUrl:'tpls/product/workflowinfo.html'
            })
            //切割
            .state('main.productmng.cutinfo',{
                url:'/cutinfo',
                templateUrl:'tpls/product/cutinfo.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.productmng,USER_ROLES.productor]
                }
            })
            //冲孔
            .state('main.productmng.punchinginfo',{
                url:'/punchinginfo',
                templateUrl:'tpls/product/punchinginfo.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.productmng,USER_ROLES.productor]
                }
            })
            //焊接
            .state('main.productmng.jointinginfo',{
                url:'/jointinginfo',
                templateUrl:'tpls/product/jointinginfo.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.productmng,USER_ROLES.productor]
                }
            })
            //分料
            .state('main.productmng.package',{
                url:'/package',
                templateUrl:'tpls/product/package.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.productmng,USER_ROLES.productor]
                }
            })
            //分配任务
            .state('main.productmng.taskallocated',{
                url:'/taskallocated',
                templateUrl:'tpls/product/taskallocated.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.productmng]
                }
            })
            //机台管理
            .state('main.productmng.mechinemng',{
                url:'/mechinemng',
                templateUrl:'tpls/product/mechinemng.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.productmng]
                }
            })
            //设计管理
            .state('main.productmng.designmng',{
                url:'/designmng',
                templateUrl:'tpls/product/designmng.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.designer,USER_ROLES.productmng]
                }
            })

    })
;
/**
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
routerApp.run(function ($rootScope, $state, $stateParams, $window, AuthService) {
    //$rootScope.ip = 'http://192.168.1.100:8080';
    //$rootScope.ip = 'http://192.168.3.158';
    $rootScope.ip = '';
    //$rootScope.ip = 'http://127.0.0.1';

    //获取电脑名称
     /*function getSysInfo(){
      try{var locator = new ActiveXObject ("WbemScripting.SWbemLocator");}
      catch (e){
      alert(e);
      }
      var service = locator.ConnectServer();
      //CPU信息
      var cpu = new Enumerator (service.ExecQuery("SELECT * FROM Win32_Processor")).item();
     var cpuType=cpu.Name,hostName=cpu.SystemName;
      //内存信息
      var memory = new Enumerator (service.ExecQuery("SELECT * FROM Win32_PhysicalMemory"));
      for (var mem=[],i=0;!memory.atEnd();memory.moveNext()) mem[i++]={cap:memory.item().Capacity/1024/1024,speed:memory.item().Speed}
      //系统信息
      var system=new Enumerator (service.ExecQuery("SELECT * FROM Win32_ComputerSystem")).item();
      var physicMenCap=Math.ceil(system.TotalPhysicalMemory/1024/1024),curUser=system.UserName,cpuCount=system.NumberOfProcessors
      return {cpuType:cpuType,cpuCount:cpuCount,hostName:hostName,curUser:curUser,memCap:physicMenCap,mem:mem}
      }
	  $rootScope.computer_id_noencode =(getSysInfo().curUser.split("\\")[0]);
      $rootScope.computer_id =(encodeURI(getSysInfo().curUser.split("\\")[0]));
*/
    //$rootScope.computer_id = "DESKTOP-6AA2E1P";
    $rootScope.computer_id = "WIN-PRMNU2HQ1CD";

    $rootScope.$on('$stateChangeStart', function (event, next) {
        var authorizedRoles = next.data.authorizedRoles;
        console.log(next.url);
        if (next.url !== "/index") {

            if (!AuthService.isAuthorized(authorizedRoles)) {

                console.log('not good');
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    event.preventDefault();
                    console.log('notAuthorized');
                    alert('您没有进入权限，请联系相关管理人员！谢谢');
                    //$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    console.log('notAuthenticated');
                    event.preventDefault();
                    // user is not logged in
                    //$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        }
    });
})
routerApp.controller('mainCtrl', function ($window,$state, $scope, USER_ROLES, AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };
})
;
