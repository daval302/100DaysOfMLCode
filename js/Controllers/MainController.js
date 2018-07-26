angular.module('stmath').controller('MainController', function($scope, $rootScope, $http){

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
		if(!$scope.$$phase) { $scope.$apply(); }
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
			// send to the AddShiftController the gogo to request shifts
			$rootScope.$broadcast('gettingShifts', true);
			break;

			case "login-error":
			$scope.debugging = data;
			break; 

			case "shiftGetter-byDate-success":
			// load the table
			// ...
			$scope.debugging = data;
			break;

			case "debugging":
			$scope.debugging = data; $scope.$digest();
			break;

			default:
			$scope.debugging = data;
			break;
		}

		$scope.debugging = data;
	} );
})