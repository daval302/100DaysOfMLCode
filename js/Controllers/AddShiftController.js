angular.module('stmath')

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