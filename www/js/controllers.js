angular.module('issApp')


  .controller('superAdminController',['$scope','superAdminFacultyService','superAdminUserService',
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
                $scope.facultyUpdate = null;                                  
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
  }])

  .controller('loginController',['$scope','$location','$rootScope','$state',function($scope,$location,$rootScope,$state){
          $scope.login = function(){
          var email = $scope.mail;
              if(email == 'veca'){
                  $rootScope.logedIn = true;
                  $state.go('superadmin');
              }
           }
  }])

  .controller('mainController',['$scope','$rootScope',function($scope,$rootScope){
    $rootScope.logedIn = false;
  }]);
