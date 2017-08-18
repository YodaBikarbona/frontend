var issApp = angular.module('issApp', ['ui.router']);

issApp.config(function($stateProvider,$urlRouterProvider){
    //RUTE
    $stateProvider
        .state('login',{
               url: '/',   //<--    LOGIN RUTE
               templateUrl: 'login.html',
               controller : 'loginController'
               })
        .state('superadmin',{   //<--- Super Admin
                url: '/superadmin',
                templateUrl: 'superadmin.html'
               })
        .state('list1',{
            parent:'superadmin',
            views:{
                'superadmin-view@superadmin':{
                    templateUrl:'superadmin/faculty_list.html'
                }
            }
        })
        .state('addFaculty',{
            parent:'superadmin',
            views:{
                'superadmin-view@superadmin':{
                templateUrl:'superadmin/add_faculty.html'
                }
            }
        })
    
    $urlRouterProvider.otherwise('/');
    
});




issApp.controller('mainController',function($scope,$rootScope){
    $rootScope.logedIn = false;
    
});

issApp.controller('loginController',function($scope,$location,$rootScope){
    
    $scope.login = function(){
        var email = $scope.mail;
        
        if(email == 'veca'){
            $rootScope.logedIn = true;
            $location.path('/superadmin');
        }
    }
  
});