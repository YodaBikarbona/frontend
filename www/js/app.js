angular.module('issApp', ['ui.router','jcs-autoValidate'])
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
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider,$httpProvider){
    //RUTE
    $stateProvider
        .state('login',{
               url: '/',   //<--    LOGIN RUTE
               templateUrl: 'templates/login.html',
               controller : 'loginController'
               })
        .state('superadmin',{   //<--- Super Admin
                url: '/superadmin',
                templateUrl: 'templates/super-admin.html',
                controller:'superAdminController'
                });
       $urlRouterProvider.otherwise('/');
}]);