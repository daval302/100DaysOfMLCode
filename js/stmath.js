
angular.module('stmath')

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

.controller('AddShiftController',function($scope, $rootScope, $http, shiftGetter){

	// gettingShifts ??
	$rootScope.$on('gettingShifts',function(event, data){
		if (data == true){
			//alert("ora dovresti avviare il loading degli shift");
			// put the loading throw the shiftGetter service
			shiftGetter.byDate(new Date());
		}
	});
	// LOAD EMPLOYEES LIST

	//$http.post($http.defaults.heroku + '');
})


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

.filter('prettyJSON', function () {
    function prettyPrintJson(json) {
      return JSON ? JSON.stringify(json, null, '  ') : 'your browser doesnt support JSON so cant pretty print';
    }
    return prettyPrintJson;
})

// SERVICES 

.factory('shiftGetter', ['$http', '$rootScope', function($http, $rootScope) {
   
	return  {
		byDate: function (date){
			// handle date type
			if (date  == null){
				var date = new Date();
				var query = date.getFullYear()+"/"+(date.getMonth()+1) +"/"+date.getDate();
			}else if (date instanceof Date){
				query = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
			}else {
				var dd = new Date(date);
				var query = dd.getFullYear()+"/"+(dd.getMonth()+1)+"/"+dd.getDate();
			}
			// send query
		$http.get($http.defaults.heroku + 'v1/shift/bydate/D/' + query).then(
			function success(response){
				// on success populate the table
				// for now just debug the data
				$rootScope.$broadcast('server-response', {scope:'shiftGetter-byDate-success', data: response.data} );
			}, function error(response){
				$rootScope.$broadcast('server-response', {scope:'shiftGetter-byDate-error', data: response.data } );
			});
		}

	}


}]);

// CONSOLE DEBUGGING FOT SERVICE
//  angular.element(document.body).injector().get('$shiftGetter')

