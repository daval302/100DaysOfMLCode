angular.module('stmath')

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
		$http.get($http.defaults.heroku + 'v1/shift/bydate/' + query).then(
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