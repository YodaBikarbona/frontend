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
                
               });
       
    
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
    $scope.f ={};
    var deleteFacultyId = null;
    
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
                
           });
       }
         $scope.setFacultydeleteId = function(id){
                deleteFacultyId = id;
            
         }
       
          $scope.deleteFaculty = function(){
               if(deleteFacultyId!=null){
                      $http.delete('http://localhost:6543/tff_api/v1.0/faculty/'+deleteFacultyId+'/delete')
                        .then(function(data){
                            deleteFacultyId = null;
                      })
                          .catch(function(data){
                         console.log(data);
                      });
                        for(i = 0; i < $scope.facultyList.length; i++){
                            if($scope.facultyList[i].id == deleteFacultyId){
                                $scope.facultyList.splice(i,1);
                            }
                        }
                    }
         
                }
           
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






