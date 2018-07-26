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

	// just an example to load the table
	$scope.shifts = [];
	$.getJSON('json/sample_shifts.json', function(data){
		//$rootScope.$broadcast('server-response', {"scope":"debugging", "data": data} );
		// populate the employees list on the table
		$scope.shifts = data.slice(0,10);
	});
})