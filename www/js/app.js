angular.module('issApp', ['ui.router','jcs-autoValidate','ngAnimate'])
/* VALIDATE ERROR MASSAGES */
.run(['defaultErrorMessageResolver','FORM_ERROR',function(defaultErrorMessageResolver,FORM_ERROR){
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMesages){
        errorMesages['requiredMessage'] = FORM_ERROR.requiredMessage;

        errorMesages['invalidFacultyname'] = FORM_ERROR.invalidFacultyname;
        errorMesages['invalidFacultyminlength'] = FORM_ERROR.invalidFacultyminlength;
        errorMesages['invalidFacultymaxlength'] = FORM_ERROR.invalidFacultymaxlength;

        errorMesages['invalidCity'] = FORM_ERROR.invalidCity;
        errorMesages['invalidCityminlength'] = FORM_ERROR.invalidCityminlength;
        errorMesages['invalidCitymaxlength'] = FORM_ERROR.invalidCitymaxlength;

        errorMesages['invalidAddress'] = FORM_ERROR.invalidAddress;
        errorMesages['invalidAddressminlength'] = FORM_ERROR.invalidAddressminlength;
        errorMesages['invalidAddressmaxlength'] = FORM_ERROR.invalidAddressmaxlength;

        errorMesages['invalidPhone'] = FORM_ERROR.invalidPhone;
        errorMesages['invalidPhoneminlength'] = FORM_ERROR.invalidPhoneminlength;
        errorMesages['invalidPhonemaxlength'] = FORM_ERROR.invalidPhonemaxlength;
    });
}])

/* UI ROUTHER CONFIG */
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    //RUTE
    $stateProvider
        .state('login',{
               url: '/login',   //<--    LOGIN RUTE
               templateUrl: 'templates/login.html',
               controller : 'loginController'
        })
        .state('superadmin',{   //<--- Super Admin
                url: '/superadmin',
                templateUrl: 'templates/superadmin.html',
                controller:'superAdminController',
                params: {
                  user: null
                }
          })
        .state('admin',{
          url: '/admin',
          templateUrl: 'templates/admin.html',
          controller: 'adminController',
          params: {
            user: null
          }
        })
        .state('professor',{
          url: '/professor',
          templateUrl: 'templates/professor.html'
        })
        .state('assistant',{
          url:'/assistant',
          templateUrl:'templates/assistant.html'
        })
        .state('student',{
          url:'/student',
          templateUrl:'templates/student.html'

        })

       $urlRouterProvider.otherwise('/login');
}])

.run(function($transitions,$state,authservice,ROLE){
    $transitions.onStart({ to:'*'},function(){
      if(!authservice.isAuthenticated()){
       // $state.go('login');
      }});
    
    
  })



