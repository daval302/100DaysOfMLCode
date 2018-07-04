(function (angular) {
	'use strict';
	
	angular.module('stmath', [])

	.controller('MainController', function($scope, $rootScope, $http){

		$http.defaults.headers.common.Accept = 'application/json';
		$http.defaults.heroku = 'https://stmath-server.herokuapp.com/api/';

		// pay attention on data server
		$rootScope.$on('server-response',function(event, data){
			$scope.debugging = data;
		} );
	})

	.controller('EmployeeListController', function($scope, $rootScope, $http){
		// how to use exchanging server data
		//$rootScope.$broadcast('server-response', [{name : "Davide", age: 30}, {name : "Francesco", age: 27}]);
	})

	.directive('employeeList', function(){
		return {
			templateUrl: 'views/employee-list.html',
			controller: 'EmployeeListController'
		}
	})

	.filter('prettyJSON', function () {
	    function prettyPrintJson(json) {
	      return JSON ? JSON.stringify(json, null, '  ') : 'your browser doesnt support JSON so cant pretty print';
	    }
	    return prettyPrintJson;
	})


})(window.angular);