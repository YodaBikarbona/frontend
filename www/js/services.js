angular.module('issApp')
  
  .service('adminService', ['$http','API_ENDPOINT','ROLE','$log', function($http, API_ENDPOINT,ROLE,$log){

    this.getProffesors = function(callback){
      $http({
        url: API_ENDPOINT.url+ '/users?role_id=' + ROLE.profesor,
        method: 'GET'
      }).then(function(resp){
          callback(resp.data.user_list);
      },
        function(resp){
          $log.log('ERROR');
        });
      }

    this.getAssistents = function(callback){
      $http({
        url: API_ENDPOINT.url+ '/users?role_id=' + ROLE.asistent,
        method: 'GET'
      }).then(function(resp){
        callback(resp.data.user_list);
      },
        function(resp){
          $log.log('ERROR');
        });

    }
    this.getStudents = function(callback){
      $http({
        url: API_ENDPOINT.url+ '/users?role_id=' + ROLE.student,
        method: 'GET'
      }).then(function(resp){
        callback(resp.data.user_list);
      },
        function(resp){
          $log.log('ERROR');
        });
    }
    

    this.addUsers = function(user,callback){
      $http({
        url: API_ENDPOINT.url+'/users/add',
        method:'POST',
        data: user
      }).then(function(resp){
        callback(resp)
      },function(resp){
        $log.log('ERROR');
      });
    }
    
    this.deleteAccount = function(id){
        $http({
          url : API_ENDPOINT.url + '/users/'+id+'/delete',
          method : 'DELETE',
          }).then(function(resp){

          },function(resp){

          });
        }
    this.deactivateAccount = function(id){

     $http({
            url : API_ENDPOINT.url + '/users/change_activation_status',
            method : 'POST',
            data : {user_id : id}
          }).then(function(resp){
            console.log(resp);

          },function(resp){

          });
    }
}])
  .service('superAdminFacultyService', ['$http','API_ENDPOINT', function($http, API_ENDPOINT){

      this.getListFaculties = function (cb) {
           $http({
                      url : API_ENDPOINT.url+'/faculties',
                   method : "GET"
                  })
                  .then(function(response){
                      cb(response.data.faculty_list);
                },function(data){});
              }

          this.getCountries = function(cb){
            $http({
                url : API_ENDPOINT.url +'/countries',
                method : "GET"
            })
            .then(function(response) {
              cb(response.data.country_list);
            },function(data){});
          }

         this.deleteFaculty = function(deleteFacultyId){
           $http({
             url: API_ENDPOINT.url + '/faculty/'+deleteFacultyId +'/delete',
             method: 'DELETE'
           })
           .then(function(resp){
            },function(resp){});
         }

         this.getFacultybyId = function(facultyId,callback){
           $http({
             url : API_ENDPOINT.url + '/faculty/'+facultyId,
             method : 'GET'
           })
           .then(function(resp){
             callback(resp);
           },function(resp){});
         }

         this.updateFaculty = function(id,faculty){
           $http({
             url : API_ENDPOINT.url + '/faculty/'+id+'/edit',
             method : 'POST',
             data : faculty
           })
            .then(function(resp){
            },function(resp){});
          }

          this.addFaculty = function(faculty,callback){
            $http({
              url : API_ENDPOINT.url + '/faculty/add',
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
  }])

  .service('superAdminUserService', ['$http','$log','API_ENDPOINT', function($http,$log,API_ENDPOINT){

       this.getUsers = function(callback){
         $http({
           url : API_ENDPOINT.url + '/users',
           method : 'GET'
         })
         .then(function(resp){
           callback(resp.data.user_list);
         },function(resp){});
        }

        this.toogleUseractivation = function(id){
          $http({
            url : API_ENDPOINT.url + '/users/change_activation_status',
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
            url : API_ENDPOINT.url + '/users/'+id+'/delete',
            method : 'DELETE',
            }).then(function(resp){
            },function(resp){});
        }

        this.addUser = function(user,callback){
          $http({
            url : API_ENDPOINT.url + '/users/add',
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
            url : API_ENDPOINT.url + '/country/city/faculties',
            method : 'POST',
            data : user
          }).then(function(resp){
            callback(resp.data.faculty_list);
          },function(resp){});
        }
  }])

  .service('authservice', ['$http','API_ENDPOINT','$q', function($http,API_ENDPOINT,$q){
      var LOCAL_STORAGE_KEY = 'mytoken'
      var authToken;
      var isAuthenticated = false;
      var role = '';
      var userName;

      function loadUserCredidentals(){
        var token = window.localStorage.getItem('mytoken')
          if(token){
            isAuthenticated = true;
             $http.defaults.headers.common['Authorization'] = token;
          }
      }

      function storeUserCredidentals(user){
        window.localStorage.setItem(LOCAL_STORAGE_KEY, user.token);
        useUserCredidentals(user);   
      }

      function useUserCredidentals(user){
        userName = user.first_name;
        isAuthenticated = true;
        authToken = user.token;
        role = user.role_id;

        $http.defaults.headers.common['Authorization'] = authToken;

      }

      function destroyUserCredidentals(){
        isAuthenticated = false;
        userName = '';
        role = '';
        window.localStorage.clear(LOCAL_STORAGE_KEY);
         $http.defaults.headers.common.Authorization = undefined;
        

      }
     
      var login = function(user){
        return $q(function(resolve,reject){
                    $http({
                          url :     API_ENDPOINT.url + '/login',
                          method : 'POST',
                          data :    user
      }).then(function(resp){
          if(resp.data.status = 'Ok'){
            storeUserCredidentals(resp.data.user_data);
              resolve(resp.data);
          }else{
            reject(resp.data);
            
          }
        },function(resp){
            
          });
  })}
        loadUserCredidentals();
      
      var logout = function(){
        destroyUserCredidentals();
      }

      return {
        login : login,
        logout : logout,
        isAuthorized : true,
        isAuthenticated : function(){return isAuthenticated;},
        userName : function(){return userName;},
        role: function(){return role;}
      }
  }])

.factory('AuthInterceptor', ['$rootScope', function($rootScope){
    var inter = {}
    console.log('hey')
   return inter;
}])

.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}])
  
