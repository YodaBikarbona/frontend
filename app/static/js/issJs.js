var issApp = angular.module('issApp', ['ngRoute']);

issApp.config(function($routeProvider){
   
    $routeProvider
        .when('/',{
            templateUrl: 'templates/login.html',
            controller: 'loginController'
        
    })
        .when('/admin',{
        templateUrl: 'templates/adminpanel.html',
        
        
        resolve:{
            "check" : function($location,$rootScope){
                console.log($rootScope.logedIn);
                    if(!$rootScope.logedIn){
                        $location.path('/');
                    }
                }
            }
        
    })
        .when('/superadmin',{
         templateUrl:'templates/superadminpanel.html',
         controler:'superAdminMainController'
        
    }).when('/faculties',{
            templateUrl: 'templates/superadmintemplates/faculty_list.html',
            })
        .otherwise({
            redirectTo: '/' 
    });
    
    
    
});



issApp.controller('mainController',function($scope){}); // <---Glavni kontroler

/*Kontroler za login*/
issApp.controller('loginController',function($scope,$location,$rootScope){ 
    $scope.login = function(){
        var email = $scope.email;
        var pass = $scope.password;
        if(email == "a@a" && pass == "a"){
            $rootScope.logedIn = true;
            $location.path('/admin');
            }
        
        }
});

issApp.controller('superAdminMainController',function($scope){});

