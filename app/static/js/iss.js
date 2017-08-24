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

issApp.controller('superAdminController' ,function($scope,$http,$state,$rootScope){
   
    var facultiListindex = null;
    var deleteFacultyId = null;
    $scope.countries;
    
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
         $scope.setFacultydeleteId = function(id,index){
                deleteFacultyId = id;
                setListIndex(index);
            }
        function setListIndex(index){
                facultiListindex = index;
            }
        
        $scope.deleteFaculty = function(){
            if(deleteFacultyId!=null){
                $http.delete('http://localhost:6543/tff_api/v1.0/faculty/'+deleteFacultyId+'/delete')
                    .then(function(data){
                        $scope.facultyList.splice(facultiListindex,1);
                        deleteFacultyId = null;
                        facultiListindex = null;
                      })
                        .catch(function(data){
                            deleteFacultyId = null;
                            facultiListindex = null;
                      });
                }
            }
            $scope.getFacultybyId = function(id,index){
                $http.get("http://localhost:6543/tff_api/v1.0/faculty/"+id)
                        .then(function(response){
                            $scope.facultyUpdate = response.data.faculty_dict;
                            $scope.loadCountries()
                            setListIndex(index);
                        }).catch(function(data){
                    });
              
            }
           $scope.updateFaculty = function(id){
                $http.post("http://localhost:6543/tff_api/v1.0/faculty/"+id+"/edit", $scope.facultyUpdate)
                    .then(function(data){
                        var country;
                        for(var i = 0; i < $scope.countries.length; i++){
                            if($scope.countries[i].code == $scope.facultyUpdate.country){
                                country = $scope.countries[i].name;
                               
                            }
                        } 
                        $scope.facultyList[facultiListindex] = $scope.facultyUpdate;
                        $scope.facultyList[facultiListindex].country_name = country;
                        setListIndex(null);
                    })
                    .catch(function(data){
                     });
                }
            $scope.facultyAdd = function(){
                $http.post('http://localhost:6543/tff_api/v1.0/faculty/add' , $scope.f)
                     .then(function(data){
                        $scope.msg = data.data.message;
                    })
                     .catch(function(data){
                        $scope.msg = data.data.error_msg;  
                        console.log(data);
                   });
                }
        });





