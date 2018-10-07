angular.module('stmath')

.factory('shiftGetter', ['$http', '$rootScope', function($http, $rootScope) {
   
	var employees;
	var loaded = false;

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
			},

		byDateRange: function(date1 = null, date2 = null){

			// !! HARDCODED -- needs to be removed (1 week load for table)!!
			date1 = '2018-08-01';
			date2 = '2018-08-07';
			// !! HARDCODED !! -- end 

			// check the date1 and date2 in case swap order
			var d1 = moment(date1);
			var d2 = moment(date2);
			if (d1 > d2) {
				var temp = d1;
				d1 = d2;
				d2 = temp;
			}

			// built up query
			var query = d1.format('YYYY/MM/DD') + "/" + d2.format('YYYY/MM/DD');

			// make server request
			$http.get($http.defaults.heroku + 'v1/shift/bydaterange/' + query).then(
				function success(response){
					$rootScope.$broadcast('server-response', {scope:'shiftGetter-byDateRange-success', data: response.data} );
					employees = response.data;
					loaded = !loaded;
				}, function error(response){
					$rootScope.$broadcast('server-response', {scope:'shiftGetter-byDateRange-error', data: response.data } );
				});

			
			//return $http.defaults.heroku + 'v1/shift/bydaterange/' + query;
		
		}, // end byDateRange

		dataLoaded: function(){return loaded;},
		getEmployees: function(){
			if (loaded)
				return employees;
			else return {error: true, msg: "No data loaded yer"}
		},

		update: function(data){
			/*	HARDCODING 
			WEB SERVICE 
			send changes and update to server
			*/
			console.log('Changes updated');
		}
	}


}])

// CONSOLE DEBUGGING FOT SERVICE
//  angular.element(document.body).injector().get('shiftGetter')