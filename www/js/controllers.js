angular.module('issApp')

  .controller('adminController', ['$scope','$state','adminService','courseSevice','ROLE','userservice', 
                                                          function($scope,$state,adminService,cS,ROLE,userservice){
      $scope.roles = ['profesor','asistent','student'];
      $scope.userParams = $state.params.user;
       

      
      var user = {
          created : '',
          deactivated:false,
          deleted:false,
          email:'',
          faculty_id:null,
          faculty_name:'',
          first_name:'',
          id:null,
          index_id:null,
          last_change_date:'',
          last_name:'',
          registration_date:'',
          role:{
              name:''
          },
          role_id:null,
          status:null,
          userListIndex:null
      }

      
      $scope.addUsers = function(user){
        
        userservice.createUser(user,function(msg){

        });
      }
      $scope.getOneUser = function(id){
        adminService.getUserById(id,function(user){
         $scope.userUpdate = user;
        });
      }

      $scope.updateUser = function(user){
        userservice.updateUser(user);
        $scope.userUpdate = {};
      }



      $scope.deactivateAccount = function(id,role,index){
        userservice.deactivateAccount(id);
          
        if(role === ROLE.profesor){
        $scope.profesors[index].deactivated = !$scope.profesors[index].deactivated;
        }else if(role === ROLE.asistent) {
        $scope.assistents[index].deactivated = !$scope.assistents[index].deactivated;
        }else if(role === ROLE.student){
        $scope.students[index].deactivated = !$scope.students[index].deactivated;
        }
    }
      $scope.setAccountDeleteData = function(id,role_id,index){
          user.id = id;
          user.role_id = role_id;
          user.userListIndex = index;
        }

      $scope.deleteUser = function(){
        userservice.deleteUser(user.id,function(message){

          if(user.role_id === ROLE.profesor){
            $scope.profesors.splice(user.userListIndex,1);
          }else if(user.role_id === ROLE.asistent) {
            $scope.assistents.splice(user.userListIndex,1);
          }else if(user.role_id === ROLE.student){
            $scope.students.splice(user.userListIndex,1);
          }
        });
      }
        
      
      $scope.getCourses = function(){
        cS.getCourses(function(course){
          $scope.courses = course;
        });
      }

      $scope.getPorfesors = function(){
        $scope.profesors = [];
       
         userservice.getProfessors(function(profesors){
            $scope.profesors = profesors;
        });
      }

     $scope.getAssistents = function(){
     
      userservice.getAssistants(function(assistents){
        $scope.assistents = assistents;
      });
      }

     $scope.getStudents = function(){
    
        userservice.getStudents(function(students){
        $scope.students = students;
      });
    }

    $scope.getAbbreviations = function(course_id,index){
      $scope.index = index;
      
      
      if(course_id!= null){
      
      cS.getAbbreviationForCourse(course_id,function(abbreviations){
        $scope.abbreviations = abbreviations;
      });
    }
    }
    
    $scope.addAbbreviation = function(course_id ,abbr){
      cS.addAbbriviation(course_id,abbr);
    }
    
    
  }])

  .controller('superAdminController',['$scope','$state','superAdminFacultyService','userservice',
        function($scope,$state,superAdminFacultyService,userservice){

      var facultiListindex = null;
      var deleteFacultyId = null;
      $scope.userParams = $state.params.user;

      var user = {
          created : '',
          deactivated:false,
          deleted:false,
          email:'',
          faculty_id:null,
          faculty_name:'',
          first_name:'',
          id:null,
          index_id:null,
          last_change_date:'',
          last_name:'',
          registration_date:'',
          role:{
              name:''
          },
          role_id:null,
          status:null,
          userListIndex:null
      }

    




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
            userservice.getAdmins(function(usrList){
                  $scope.usersList = usrList;
                  });
              }

      $scope.toogleUseractivation = function(id,index){
            userservice.deactivateUser(id);
                $scope.usersList[index].deactivated = !$scope.usersList[index].deactivated;
            
            }
      $scope.setUser = function(id,index){
          user.id = id;
          user.usersListIndex = index;
      }

      $scope.deleteUser = function(){
              userservice.deleteUser(user.id,function(message){
                console.log(message.status);
                $scope.serverMessage = message;
              });
                  $scope.usersList.splice(user.usersListIndex,1);

          }
      $scope.loadCitiesByCountry = function(country){
              $scope.cities = $scope.countries[country-1].cities;
              resetUser();
            }

      $scope.getListofFacultiesbyCoutryAndCity = function(user){
            resetUser();
              if(user.country!=null && user.city!=null){
                superAdminFacultyService.getListOfFaculties(user,function(list){
                  $scope.facultyListByCity = list;
                });
              }}


   
      $scope.addUsers = function() {
          angular.element('#add-user-modal').modal("hide");
          userservice.createUser($scope.addUser,function(message){
             $scope.serverMessage = message;
               $scope.addUser = null;
              
            });
          }

      function resetUser(){
            $scope.addUser.faculty = null;
            $scope.addUser.first_name = null;
            $scope.addUser.last_name = null; // <---OVO MI SE NE SIVDJA
            $scope.addUser.email = null;
            $scope.addUser.password = null;
          }
  }])

  .controller('loginController',['$scope','authservice','$rootScope','$state','ROLE',function($scope,auth,$rootScope,$state,ROLE){
          
          $scope.login = function(){
            var user = { email:$scope.mail, password: $scope.password};
                if(user!=null){
                  auth.login(user).then(function(authenticated){
                    if(auth.role() == ROLE.superadmin){
                            $state.go('superadmin',{user:auth.userObj()});
                      }
                    
                    if(auth.role() == ROLE.admin){
                            $state.go('admin',{user:auth.userObj()});
                      }
                    },function(err){});
                  }
                }
  }])

  .controller('mainController',['$scope','$rootScope','authservice',function($scope,$rootScope,auth){
    $scope.logout = function(){
      auth.logout();
    }
}]);
  
