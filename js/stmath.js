(function (angular) {
	'use strict';
	
	angular.module('stmath', [])

	.controller('MainController', function($scope, $rootScope, $http){

		$http.defaults.headers.common.Accept = 'application/json';
		$http.defaults.heroku = 'https://stmath-server.herokuapp.com/api/';

		// active views
		$scope.views = {
			"login": true,
			"employee-list" : false
		}

		// pay attention on data erver response
		$rootScope.$on('server-response',function(event, data){
			
			// data receiverd to the MainControler has be handled case by case
			switch(data.scope){

				case "login-success":
				// setting up the accesToken
				$http.defaults.headers.Authorization = "Bearer " + data.token;
				$http.defaults.expire = data.expires_at;
				break;

				case "login-error":
				$scope.debugging = data;
				break; 
			}

			$scope.debugging = data;
		} );
	})

	.controller('EmployeeListController', function($scope, $rootScope, $http){
		// how to use exchanging server data
		//$rootScope.$broadcast('server-response', [{name : "Davide", age: 30}, {name : "Francesco", age: 27}]);
	})

	.controller('LoginController', function($scope, $rootScope, $http){

		// MODELS
		$scope.form = {'email':null, password: null}
		
		// SUBMIT FUNCTION
		$scope.submit = function(){
			$http.post($http.defaults.heroku + 'login', $scope.form ).then(
				function success(response){
					// login procedure produce a setting environmen acessToken, but they needs to be handled from  the MainController 
					$rootScope.$broadcast('server-response', jQuery.extend({scope: 'login-success'}, response.data.success) );
				}, function error(response){
					$rootScope.$broadcast('server-response', jQuery.extend({scope: 'login-error'}, response.data)  );
				}
			);
			//$rootScope.$broadcast('server-response', $scope.form);
		}
	})

	.directive('employeeList', function(){
		return {
			templateUrl: 'views/employee-list.html',
			controller: 'EmployeeListController'
		}
	})

	.directive('login', function(){
		return {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		}
	})

	.filter('prettyJSON', function () {
	    function prettyPrintJson(json) {
	      return JSON ? JSON.stringify(json, null, '  ') : 'your browser doesnt support JSON so cant pretty print';
	    }
	    return prettyPrintJson;
	})


})(window.angular);