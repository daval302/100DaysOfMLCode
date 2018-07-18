(function (angular) {
	'use strict';
	
	angular.module('stmath', [])

	.controller('MainController', function($scope, $rootScope, $http){

		$http.defaults.headers.common['Accept'] = 'application/json';
		$http.defaults.heroku = 'https://stmath-server.herokuapp.com/api/';

		// active views
		$scope.views = {
			"login": false,
			"employee-list" : false,
			"addshift" : false
		}

		$scope.selectView = function(view){
			for (var v  in $scope.views){
				if (v == view)
					$scope.views[v] = true;
				else $scope.views[v] = false;
			}
		}

		// pay attention on data erver response
		$rootScope.$on('server-response',function(event, data){
			
			// data receiverd to the MainControler has be handled case by case
			switch(data.scope){

				case "login-success":
				// setting up the accesToken
				$http.defaults.headers.common['Authorization'] = "Bearer " + data.token;
				$http.defaults.expire = data.expires_at;
				// pass to the add shift view
				$scope.selectView('addshift');
				if(!$scope.$$phase) { $scope.$apply(); }
				// send to the AddShiftController the gogo to request shifts
				$rootScope.$broadcast('gettingShifts', true);
				break;

				case "login-error":
				$scope.debugging = data;
				break; 

				default:
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

	.controller('AddShiftController',function($scope, $rootScope, $http){

		// attila
		$scope.load = function(){
			$scope.getShift();
		}

		// define a function to load employee (the request is an example)
		$scope.getShift = function(){
			$http.get($http.defaults.heroku + 'v1/shift/bydate/D/2018/02/15').then(
				function success(response){
					// on success populate the table
					// for now just debug the data
					$rootScope.$broadcast('server-response', response.data );
				}, function error(response){
					$rootScope.$broadcast('server-response', response.data);
				}
			);
		}

		// gettingShifts ??
		$rootScope.$on('gettingShifts',function(event, data){
			if (data == true){
				alert("ora dovresti avviare il loading degli shift");
			}
		});
		// LOAD EMPLOYEES LIST

		//$http.post($http.defaults.heroku + '');
	})

	.directive('addshift', function(){
		return {
			templateUrl: 'views/addshift.html',
			controller: 'AddShiftController'
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