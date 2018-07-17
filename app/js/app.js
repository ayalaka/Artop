


var myApp = angular.module("myApp", ["ngRoute"]);


   myApp.config(['$routeProvider', function($routeProvider) {
     $routeProvider
		.when("/entry", {
		    templateUrl: "/entry.html",
		})
		.when('/index', {
		    templateUrl: "app/index.html",
		})
		.when('/tarif', {
		    templateUrl: "templates/tarif.html",
		})
		.when('/patients', {
		    templateUrl: "templates/patients.html",
			controller: "patientController"
		})
		.when('/projects', {
		    templateUrl: "templates/projects.html",
			controller: "projectsController"
		})
		.when('/printDoc', {
		    templateUrl: "templates/printDoc.html",
		})
		
		.otherwise({ redirectTo: '/entry' });
}]);


myApp.service("patientsService",function($http,$q){
	var deferred = $q.defer();
	$http.get('https://api.mlab.com/api/1/databases/artop/collections/patients?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo').then(function (data) {
		deferred.resolve(data);
	});
	this.getPatients = function(){
		return deferred.promise;
	}
})

myApp.service("projectsService", function ($http, $q) {
	var deferred = $q.defer();
	$http.get('https://api.mlab.com/api/1/databases/artop/collections/Projects?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo').then(function (data) {
		deferred.resolve(data);
	});
	this.getProjects = function(){
		return deferred.promise;
	}
})

myApp.controller('patientController', function ($scope, $http, $q, patientsService) {
	var promise = patientsService.getPatients();
	promise.then(function(data){
 		$scope.patients = data.data;
	});
	
	function resetItem(){
	   $scope.patient = {
	       projectName: '',
	       patientName: '',
	       adresse: '',
		   phone : '',
		   EMail : '',
		   communicate: '',
		   payments: ''
	   };              
	   $scope.displayForm = '';
	   
	}
	resetItem();
	
	$scope.addItem = function () {
	   resetItem();
	   $scope.displayForm = true;
	 };
	 
	 
	 
	 
	 
	 $scope.editItem = function (data) { 
            console.log("eddit");	 
			$scope.patient = data;
			$scope.displayForm2 = true;
			console.log("eddit2");
	};
		 
    $scope.create = function(data) {
        $http.post('https://api.mlab.com/api/1/databases/artop/collections/patients?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo', { 'projectName': $scope.patient.projectName, 'patientName': $scope.patient.patientName, 'adresse': $scope.patient.adresse, 'phone': $scope.patient.phone, 'EMail': $scope.patient.EMail, 'communicate': $scope.patient.communicate, 'payments': $scope.patient.payments })
            .then(function(response) {
                console.log("data entered");
				$scope.patients.push($scope.patient);
				$('#myModal3').modal('hide');
	          });
           
    };
	
	$scope.update = function(id) {
		 
		var tbd = id.$oid;
	    $http.put('https://api.mlab.com/api/1/databases/artop/collections/patients/' + tbd + '?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo', { 'projectName': $scope.patient.projectName, 'patientName': $scope.patient.patientName, 'adresse': $scope.patient.adresse, 'phone': $scope.patient.phone, 'EMail': $scope.patient.EMail, 'communicate': $scope.patient.communicate, 'payments': $scope.patient.payments })
            .success(function(response) {
                console.log('updated');
            });
    }
	
	
		
		
	
    $scope.removeItem = function(id,patient) {
		
		console.log(id.$oid);
		var tbd = id.$oid;
		console.log(tbd);
		if (confirm('האם אתה בטוח שאתה רוצה למחוק?')){
		    $http['delete']('https://api.mlab.com/api/1/databases/artop/collections/patients/' + tbd + '?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo')
            .then(function(response) {
				console.log(patient.firstName);
				
				$scope.patients.splice($scope.patients.indexOf(patient), 1);
				
                console.log('Deleted');
            });
		   
		}
	}
	
    
	
	  $scope.removeModal= function(){
          $scope.displayForm = false;		 		  
      };
	  
	  $scope.removeModal2= function(){
          $scope.displayForm2 = false;		 		  
      };
	
})

myApp.controller('myCtrl', function($scope, $http) {
    $http.get("https://api.mlab.com/api/1/databases/artop/collections/patients"
	+"?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo")
    .then(function(response) {
        $scope.myWelcome = response.data;
        console.log("data",response);
    });
});

myApp.controller('projectsController', function ($scope, $http, $q, projectsService) {
    var promise = projectsService.getProjects();
	promise.then(function(data){
 		$scope.projects = data.data;
	});
	
	function resetItem(){
	   $scope.project = {
	       projectStatus: '',
	       urgencyLevel: '',
	       pickupColors: '',
	       vision: '',
	       schedule: '',
		  
	   };              
	   $scope.displayForm = '';
	   
	}
	resetItem();
	
	$scope.addItem = function () {
	   resetItem();
	   $scope.displayForm = true;
	 };
	 
	 
	 $scope.editItem = function (data) { 
            console.log("eddit");	 
			$scope.project = data;
			$scope.displayForm2 = true;
			console.log("eddit2");
	};
	
	 $scope.create = function(data) {
	     $http.post('https://api.mlab.com/api/1/databases/artop/collections/Projects?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo', { 'projectStatus': $scope.project.projectStatus, 'urgencyLevel': $scope.project.urgencyLevel, 'pickupColors': $scope.project.pickupColors, 'vision': $scope.project.vision, 'schedule': $scope.project.schedule })
            .then(function(response) {
				$scope.projects.push($scope.project);
                console.log("data entered");
				$('#myModal').modal('hide');
	          });
           
	 };

	
	$scope.update = function(id) {
		 
		var tbd = id.$oid;
	    $http.put('https://api.mlab.com/api/1/databases/artop/collections/Projects/' + tbd + '?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo', { 'projectStatus': $scope.project.projectStatus, 'urgencyLevel': $scope.project.urgencyLevel, 'pickupColors': $scope.project.pickupColors, 'vision': $scope.project.vision, 'schedule': $scope.project.schedule })
            .success(function(response) {
                console.log('updated');
            });
    };
	
	

	
	 $scope.removeItem = function(id,project) {
		
		console.log(id.$oid);
		var tbd = id.$oid;
		console.log(tbd);
		if (confirm('האם אתה בטוח שאתה רוצה למחוק?')){
		    $http['delete']('https://api.mlab.com/api/1/databases/artop/collections/Projects/' + tbd + '?apiKey=HUosNgRrowmswAB98uy11UXQk0OmASjo')
            .then(function(response) {
				console.log(project.projectStatus);
				
				$scope.projects.splice($scope.projects.indexOf(project), 1);
				
                console.log('Deleted');
            });
		   
		}
	}
	
	$scope.removeModal= function(){
          $scope.displayForm = false;		 		  
      };
	  
	  $scope.removeModal2= function(){
          $scope.displayForm2 = false;		 		  
      };
	
});


