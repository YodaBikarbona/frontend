var superAdminApp = angular.module('superAdmin',['ngRoute']); 

superAdminApp.config(function($routeProvider){
    
    $routeProvider.when('/faculties',{
       
        templateUrl:'superadmintemplates/faculty_list.html',
        controller: 'facultyListController'
   
    }).when('/add',{
        templateUrl:'superadmintemplates/add_faculty.html',
        controller:'addFacultyController'
        
        }).otherwise({
        redirectTo: '/'
    });
});

superAdminApp.controller('superAdminController',function($scope){});

superAdminApp.controller('facultyListController', function($scope,$http){
    $http.get('http://localhost:6543/tff_api/v1.0/faculties')
        .then(function(response){
            $scope.facultyList = response.data.faculty_list;
    })
        .catch(function(data){
            console.log(data);
    });
});

superAdminApp.controller('addFacultyController',function($scope,$http){
    
    $scope.addFaculty = function(){
        
      $http.post('http://localhost:6543/tff_api/v1.0/faculty/add', $scope.faculty)
            .then(function(data){
                $scope.statusMessage = data.data.message;
                })
            .catch(function(data){
                $scope.statusMessage = data.data.message;
       });
    }
    
});