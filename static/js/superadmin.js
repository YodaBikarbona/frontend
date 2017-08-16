var supadm = angular.module('superadminpanel', []);

var url = "localhost";
//var url = "0.0.0.0";

supadm.controller('superadmincontroller' , function($scope,$http){
    
    
    
    $http.get('http://localhost:6543/tff_api/v1.0/faculties').then(function(response){
          
        
        $scope.faculty_info = response.data.faculty_list;
        }
    ).catch(function(data){
        console.log(data);
     });
    
    $scope.addFaculty = function(){
        $http.post('http://localhost:6543/tff_api/v1.0/faculty/add' ,$scope.f).then(function(data){
            console.log(data);
             console.log(f);
        }).catch(function(data){
            
        });
        
        
        
        
        
    } 
    
}); 

