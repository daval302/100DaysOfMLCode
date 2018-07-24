angular.module('stmath')


.directive('mainView', function(){
	return {
		templateUrl: 'views/main-view.html',
		controller: 'MainController'
	}
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

// FILTERS

.filter('prettyJSON', function () {
    function prettyPrintJson(json) {
      return JSON ? JSON.stringify(json, null, '  ') : 'your browser doesnt support JSON so cant pretty print';
    }
    return prettyPrintJson;
});