var issApp = angular.module('issApp', ['ui.router','jcs-autoValidate']);
/* VALIDATE ERROR MASSAGES */
issApp.run(['defaultErrorMessageResolver',function(defaultErrorMessageResolver){
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMesages){
        errorMesages['requiredMessage'] = "Ovo polje je obavezno";

        errorMesages['invalidFacultyname'] = "Naziv Fakulteta može sadržavati slova i brojeve";
        errorMesages['invalidFacultyminlength'] = "Naziv fakulteta mora sadžavati bar dva znaka";
        errorMesages['invalidFacultymaxlength'] = "Naziv fakulteta ne može biti preko 40 znakova";

        errorMesages['invalidCity'] = "Naziv grada može sadržavati slova i brojeve";
        errorMesages['invalidCityminlength'] = "Naziv grada mora sadžavati bar dva znaka";
        errorMesages['invalidCitymaxlength'] = "Naziv grada ne može biti preko 30 znakova";

        errorMesages['invalidAddress'] = "Adresa može sadržavati slova brojeve i _";
        errorMesages['invalidAddressminlength'] = "Adresa mora sadžavati bar dva znaka";
        errorMesages['invalidAddressmaxlength'] = "Adresa ne može biti preko 40 znakova";

        errorMesages['invalidPhone'] = "Telefon može sadržavati samo brojeve";
        errorMesages['invalidPhoneminlength'] = "Telefon mora imati barem 6 brojeva";
        errorMesages['invalidPhonemaxlength'] = "Telefon ne može imati više od 20 brojeva";
    });
}]);

/* UI ROUTHER CONFIG */
issApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider,$httpProvider){
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
}]);

// /////SUPER ADMIN SERVICE //////
 issApp.service('superAdminFacultyService', ['$http', function($http){

   var baseUrl = 'http://localhost:6543/tff_api/v1.0';

    this.getListFaculties = function (cb) {
         $http({
                    url : baseUrl+'/faculties',
                 method : "GET"
                })
                .then(function(response){
                    cb(response.data.faculty_list);
              },function(data){});
            }

        this.getCountries = function(cb){
          $http({
              url : baseUrl +'/countries',
              method : "GET"
          })
          .then(function(response) {
            cb(response.data.country_list);
          },function(data){});
        }

       this.deleteFaculty = function(deleteFacultyId){
         $http({
           url: baseUrl + '/faculty/'+deleteFacultyId +'/delete',
           method: 'DELETE'
         })
         .then(function(resp){
          },function(resp){});
       }

       this.getFacultybyId = function(facultyId,callback){
         $http({
           url : baseUrl + '/faculty/'+facultyId,
           method : 'GET'
         })
         .then(function(resp){
           callback(resp);
         },function(resp){});
       }

       this.updateFaculty = function(id,faculty){
         $http({
           url : baseUrl + '/faculty/'+id+'/edit',
           method : 'POST',
           data : faculty
         })
          .then(function(resp){
          },function(resp){});
        }

        this.addFaculty = function(faculty,callback){
          $http({
            url : baseUrl + '/faculty/add',
            method : 'POST',
            data : faculty
          }).then(function(resp){
            callback(resp.data.message);
          },function(resp){
            callback(resp.data.error_msg);
          });
        }

        this.convertCountryIdtoName = function(countries,faculty){
            for(var i = 0; i < countries.length; i++){
                if(countries[i].code == faculty.country){
                    return countries[i].name;
                }
              }
            }
         this.foundPhonePrefix = function(countryCode){
            var phonePrefixlist = ['00385','00387','00381','00386','0044','0049','00386','0036','0039','0047'];
            return phonePrefixlist[countryCode-1];
        }
}]);

issApp.service('superAdminUserService', ['$http','$log', function($http,$log){

     var baseUrl = 'http://localhost:6543/tff_api/v1.0';

     this.getUsers = function(callback){
       $http({
         url : baseUrl + '/users',
         method : 'GET'
       })
       .then(function(resp){
         callback(resp.data.admins_list);
       },function(resp){});
      }

      this.toogleUseractivation = function(id){
        $http({
          url : baseUrl + '/users/change_activation_status',
          method : 'POST',
          data : {user_id : id}
        }).then(function(resp){},function(resp){});
      }

      this.changeUserActivationInList = function(deactivated){
          if(deactivated){ return false;}
          else{return true;}
      }

      this.deleteUser = function(id){
        $http({
          url : baseUrl + '/users/'+id+'/delete',
          method : 'DELETE',

          }).then(function(resp){
          },function(resp){});
      }

      this.addUser = function(user,callback){
        $http({
          url : baseUrl + '/users/add',
          method : "POST",
          data : user
        }).then(function(resp){
          callback(resp.data.message);
        },function(resp){
          callback(resp.data.error_msg);
        });
      }

      this.getListOfFaculties = function(user,callback){
        $http({
          url : baseUrl + '/country/city/faculties',
          method : 'POST',
          data : user
        }).then(function(resp){
          callback(resp.data.faculty_list);
        },function(resp){});
      }
}]);
// /////SUPER ADMIN CONTROLLER //////
issApp.controller('superAdminController',['$scope','superAdminFacultyService','superAdminUserService',
      function($scope,superAdminFacultyService,superAdminUserService){

    var facultiListindex = null;
    var deleteFacultyId = null;
    // $scope.countries = [];
    // $scope.newFaculty = {};
    // $scope.usersList = [] ;
    // $scope.facultyList = [];
    // $scope.addUser = {};

    $scope.getListofFaculties = function(){
          superAdminFacultyService.getListFaculties(function(facultyList){
              $scope.facultyList  = facultyList;
            });
          }

    $scope.loadCountries = function(){
          superAdminFacultyService.getCountries(function(countries){
            $scope.countries = countries;
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
              superAdminFacultyService.deleteFaculty(deleteFacultyId);
              $scope.facultyList.splice(facultiListindex,1);
              deleteFacultyId = null;
              facultiListindex = null;
            }
          }

    $scope.getFacultybyId = function(id,index){
          superAdminFacultyService.getFacultybyId(id,function(faculty){
                $scope.facultyUpdate = faculty.data.faculty_dict;
              });
            $scope.loadCountries();
            setListIndex(index);
          }

    $scope.updateFaculty = function(id){
          superAdminFacultyService.updateFaculty(id,$scope.facultyUpdate);
          $scope.facultyList[facultiListindex] = $scope.facultyUpdate;
          $scope.facultyList[facultiListindex]
                      .country_name = superAdminFacultyService
                                                  .convertCountryIdtoName($scope.countries, $scope.facultyUpdate);
              setListIndex(null);
            }

      $scope.facultyAdd = function(){
          superAdminFacultyService.addFaculty($scope.newFaculty,function(msg){
                  $scope.msg = msg;
                });
                  $scope.newFaculty = {};
              }

      $scope.selectPhonePrefix = function(countryCode){
            $scope.newFaculty.phone = superAdminFacultyService.foundPhonePrefix(countryCode);
            }

      $scope.getUsers = function(){
          superAdminUserService.getUsers(function(usrList){
                $scope.usersList = usrList;
                });
            }

      $scope.toogleUseractivation = function(id,index){
          superAdminUserService.toogleUseractivation(id);
              $scope.usersList[index].deactivated = superAdminUserService
                          .changeUserActivationInList($scope.usersList[index].deactivated);
                }

      $scope.deleteUser = function(id,index){
            superAdminUserService.deleteUser(id);
                $scope.usersList.splice(index,1);

        }
      $scope.loadCitiesByCountry = function(country){
            $scope.cities = $scope.countries[country-1].cities;
            resetUser();
          }

      $scope.getListofFacultiesbyCoutryAndCity = function(user){
          resetUser();
            if(user.country!=null && user.city!=null){
              superAdminUserService.getListOfFaculties(user,function(list){
                $scope.facultyListByCity = list;
              });
            }}


    var interval;
      $scope.addUsers = function() {
          superAdminUserService.addUser($scope.addUser,function(addStatus){
            $scope.usersMsg = addStatus;
            $scope.addUser = null;
            interval = setInterval(clrMsg,5000);
          });
        }

       function clrMsg(){
        $scope.usersMsg = '';
        clearInterval(interval);
        }


        function resetUser(){
          $scope.addUser.faculty = null;
          $scope.addUser.first_name = null;
          $scope.addUser.last_name = null; // <---OVO MI SE NE SIVDJA
          $scope.addUser.email = null;
          $scope.addUser.password = null;

        }
}]);

// CONTROLLERS
issApp.controller('mainController',['$scope','$rootScope',function($scope,$rootScope){
    $rootScope.logedIn = false;
}]);

issApp.controller('loginController',['$scope','$location','$rootScope',function($scope,$location,$rootScope){
        $scope.login = function(){
        var email = $scope.mail;
            if(email == 'veca'){
                $rootScope.logedIn = true;
                $location.path('/superadmin');
            }
         }
       }]);
