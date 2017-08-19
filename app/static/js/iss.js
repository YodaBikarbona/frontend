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
                templateUrl: 'superadmin.html',
                controller:'superAdminController'
                
               })
        .state('list1',{
            parent:'superadmin',
            views:{
                'superadmin-view@superadmin':{
                    templateUrl:'superadmin/faculty_list.html',
                    controller: 'FacultyListController'
                    
                    
                }
            }
        })
        .state('addFaculty',{
           parent:'superadmin',
            views:{
                'superadmin-view@superadmin':{
                templateUrl:'superadmin/add_faculty.html',
                    controller: 'FacultyAddController'
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


     
    
  
    

issApp.controller('superAdminController' ,function($scope,$http){
   var facultyList = [];
   var countries = [];

  
       $scope.getListofFaculties = function(){
          $http.get('http://localhost:6543/tff_api/v1.0/faculties')
            .then(function(response){
                $scope.facultyList = response.data.faculty_list;
            })
            .catch(function(data){
               
           });
       }
       
         $scope.loadCountries = function(){
           $http.get('http://localhost:6543/tff_api/v1.0/countries')
                .then(function(response){
                    $scope.countries = response.data.country_list;
              
           })
               .catch(function(data){
                ; 
           });
       }
       
  


});

issApp.controller('FacultyListController', function($scope,$http,$rootScope){
     var countries = [];
           
})

issApp.controller('FacultyAddController' ,function($scope,$http,$rootScope){
   console.log('heyyyy');
  
      $scope.facultyAdd = function(){
           
          $http.post('http://localhost:6543/tff_api/v1.0/faculty/add' , $scope.f)
            .then(function(data){
               $scope.msg = data.data.message;
           
           })
            .catch(function(data){
              $scope.msg = data.data.error_msg;  
              
           });
       }
  

});




