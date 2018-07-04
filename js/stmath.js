(function (angular) {
	'use strict';
	
	angular.module('stmath', [])

	.controller('MainController', function($scope){
		$scope.me = "Davide";
	})

	.controller('EmployeeListController', function($scope){
		$scope.me = "list";
	})

	.directive('employeeList', function(){
		return {
			templateUrl: 'views/employee-list.html',
			controller: 'EmployeeListController'
		}
	})




})(window.angular);