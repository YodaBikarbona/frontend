angular.module('issApp')

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
           callback(resp.data.admins_list);
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
  }]);