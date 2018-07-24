angular.module('stmath')

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