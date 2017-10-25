angular.module('issApp')

  .service('subjectService', ['$http','API_ENDPOINT', function($http,apiUrl){
    
    this.getSubjects = function(id,callback){
      $http({
        url: apiUrl.url + '/faculty/course/'+id+'/faculty_courses',
        method: 'GET'
      }
      ).then(function(resp){
        callback(resp.data.faculty_courses);
      }
        ).catch(function(resp){}
        );
    }

    this.addSubject = function(subject){
      
      $http({
        url: apiUrl.url + '/faculty/course/faculty_courses/add',
        method: 'POST',
        data: subject
      }
      ).then(function(resp){
        console.log(resp);
      }
      ).catch(function(resp){
        console.log(resp);
      });
    }

    this.deleteSubject = function(id,course_id){
      $http({
        url: apiUrl.url + '/faculty/course/'+course_id+'/faculty_courses/'+id+'/delete',
        method: 'DELETE'
        }
        ).then(function(resp){}
        ).catch(function(resp){})
    }
    

  }])
  .service('courseSevice', ['$http','API_ENDPOINT',function($http,apiUrl){
    
    this.getCourses = function(callback){
    $http({
      url: apiUrl.url + '/faculty/courses',
      method: 'GET'
    })
    .then(function(resp){
      callback(resp.data.course_list);
    },function(resp){
      callback(resp);
    });
  }

  this.getAbbreviationForCourse = function(course_id,callback){
    
    $http({
      url: apiUrl.url + '/faculty/course/'+course_id+'/abbreviations',
      method: 'GET'
    }).then(function(resp){
        callback(resp.data.abbreviation_list);
    },function(resp){

    });
  }

  this.addAbbriviation = function(course_id,abbreviation){
    $http({
      url: apiUrl.url +'/faculty/course/abbreviation/add',
      method: 'POST',
      data: {
            course_id: course_id,
            abbreviation: abbreviation
          }
    }).then(function(resp){
      console.log(resp);
    },function(resp){
         console.log(resp);
    })


  }

}])
  
  .service('adminService', ['$http','API_ENDPOINT','ROLE','$log', function($http, API_ENDPOINT,ROLE,$log){

    this.getProffesors = function(callback){
      $http({
        url: API_ENDPOINT.url+ '/users?role_id=' + ROLE.profesor,
        method: 'GET'
      }).then(function(resp){
          callback(resp.data.user_list);
      },
        function(resp){
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
        function(resp){});
    }
    
    this.getOneUser = function(id,callback){

      $http({
        url: API_ENDPOINT.url +'/users/'+id,
        method: 'GET'

      }).then(function(resp){
          var user =   {
                      user_id: resp.data.user_dict.id,
                      first_name: resp.data.user_dict.first_name, 
                      last_name: resp.data.user_dict.last_name, 
                      role: resp.data.user_dict.role.name, 
                      email: resp.data.user_dict.email, 
                      password: '' 
                  }



          callback(user);
      },function(resp){

      });
    }

    this.updateAccount = function(user){
      $http({
        url: API_ENDPOINT.url + '/users/edit',
        method: 'POST',
        data: user
      }).then(function(resp){
          console.log(resp);
      },function(resp){

      })
    }
    

    this.addUsers = function(user,callback){
      $http({
        url: API_ENDPOINT.url+'/users/add',
        method:'POST',
        data: user
      }).then(function(resp){
        callback(resp)
      },function(resp){
      });
    }
    
    this.deleteAccount = function(id,callback){
        $http({
          url : API_ENDPOINT.url + '/users/'+id+'/delete',
          method : 'DELETE',
          }).then(function(resp){
              callback(resp);
          },function(resp){
              callback(resp);
          });
        }
    this.deactivateAccount = function(id){

     $http({
            url : API_ENDPOINT.url + '/users/change_activation_status',
            method : 'POST',
            data : {user_id : id}
          }).then(function(resp){
            console.log(resp)
            },function(resp){

          });
    }
}])
  .service('superAdminFacultyService', ['$http','API_ENDPOINT', function($http, API_ENDPOINT){

    this.getListOfFaculties = function(user,callback){
          $http({
            url : API_ENDPOINT.url + '/country/city/faculties',
            method : 'POST',
            data : user
          }).then(function(resp){
            callback(resp.data.faculty_list);
          },function(resp){});
        }

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

  .service('userservice',['$http','API_ENDPOINT','ROLE',function($http,API_ENDPOINT,ROLE){

    this.getAdmins = function(callback){
         $http({
           url : API_ENDPOINT.url + '/users',
           method : 'GET'
         })
         .then(function(resp){
           callback(resp.data.user_list);
         },function(resp){});
        }

    this.getProfessors = function(callback){
      $http({
        url: API_ENDPOINT.url+ '/users?role_id=' + ROLE.profesor,
        method: 'GET'
      }).then(function(resp){
          callback(resp.data.user_list);
      },
        function(resp){
        });
      }

    this.getAssistants = function(callback){
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
        function(resp){});
    }
    
    this.getUserById = function(id,callback){

      $http({
        url: API_ENDPOINT.url +'/users/'+id,
        method: 'GET'

      }).then(function(resp){
          var user =   {
                      user_id: resp.data.user_dict.id,
                      first_name: resp.data.user_dict.first_name, 
                      last_name: resp.data.user_dict.last_name, 
                      role: resp.data.user_dict.role.name, 
                      email: resp.data.user_dict.email, 
                      password: '' 
                  }
           callback(user);
      },function(resp){
      });
    }

    this.updateUser = function(user){
      $http({
        url: API_ENDPOINT.url + '/users/edit',
        method: 'POST',
        data: user
      }).then(function(resp){
          console.log(resp);
      },function(resp){

      })
    }
    
    this.createUser = function(user,callback){
      $http({
        url: API_ENDPOINT.url+'/users/add',
        method:'POST',
        data: user
      }).then(function(resp){
          callback(resp)
        },function(resp){
          callback(resp);
      });
    }
    
    this.deleteUser = function(id,callback){
        $http({
          url : API_ENDPOINT.url + '/users/'+id+'/delete',
          method : 'DELETE',
          }).then(function(resp){
              callback(resp);
          },function(resp){
              callback(resp);
          });
        }
    this.deactivateUser = function(id){
      $http({
            url : API_ENDPOINT.url + '/users/change_activation_status',
            method : 'POST',
            data : {user_id : id}
          }).then(function(resp){
            console.log(resp.data)
            },function(resp){
              console.log(resp.data)
          });
    }

}])

  .service('authservice', ['$http','API_ENDPOINT','$q', function($http,API_ENDPOINT,$q){
      var LOCAL_STORAGE_KEY = 'mytoken'
      var authToken;
      var isAuthenticated = false;
      var role = '';
      var userObj = {};

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
        userObj = user;
        isAuthenticated = true;
        authToken = user.token;
        role = user.role_id;

        $http.defaults.headers.common['Authorization'] = authToken;

      }

      function destroyUserCredidentals(){
        isAuthenticated = false;
        userObj = {};
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
          console.log(resp)
            
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
        userObj : function(){return userObj;},
        role: function(){return role;}
      }
  }])

.factory('AuthInterceptor', ['$rootScope', function($rootScope){
    var inter = {}
    
   return inter;
}])

.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}])
  
