var issApp = angular.module('issApp', ['ui.router','jcs-autoValidate']);


issApp.run(function(defaultErrorMessageResolver){
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
});


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
    $scope.newFaculty;
    
    
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
                            $scope.loadCountries();
                            setListIndex(index);
                        }).catch(function(data){
                    });
              
            }
           $scope.updateFaculty = function(id){
                $http.post("http://localhost:6543/tff_api/v1.0/faculty/"+id+"/edit", $scope.facultyUpdate)
                    .then(function(data){
                        var country;
                        $scope.facultyList[facultiListindex] = $scope.facultyUpdate;
                        $scope.facultyList[facultiListindex].country_name = convertCountryIdtoName($scope.countries, $scope.facultyUpdate);
                        setListIndex(null);
                    })
                    .catch(function(data){
                     });
                }
            $scope.facultyAdd = function(){
                $http.post('http://localhost:6543/tff_api/v1.0/faculty/add' , $scope.newFaculty)
                     .then(function(data){
                        $scope.msg = data.data.message;
                        $scope.newFaculty = null;
                    })
                     .catch(function(data){
                        $scope.msg = data.data.error_msg;  
                        console.log(data);
                   });
                } 
            $scope.selectPhonePrefix = function(countryCode){
                $scope.newFaculty.phone = foundPhonePrefix(countryCode);
            }
        });

function convertCountryIdtoName(countries,faculty){
    for(var i = 0; i < countries.length; i++){
        if(countries[i].code == faculty.country){
            return countries[i].name;
        }
    }
}

function foundPhonePrefix(countryCode){
    var phonePrefixlist = ['00385','00387','00381','00386','0044','0049','00386','0036','0039','0047'];
    return phonePrefixlist[countryCode-1];
}


