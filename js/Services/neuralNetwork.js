/**
	Lets define Input and output for the NN
	
	Defined shfit pattern as a 24 bit array that rapresent the working hours for a single shift.
		Example the slot [7-19] 12 hours shift will be rapresented as the following:
		[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0]
		where the 1 rapresent 1 hour range in the 24 hours day and 0 off time in 24 hours range
	
	Input : [ID] from DB in bit values , [shift pattern X 7 ] (168 bit) rapresent the entire week 
	Output : [shift pattern X 7 ] (168 bit)

	Note: [ID] from DB by default is a 4 byte size, so to reduce computational cost, I will rapresent in 
	Angular service as a 8 bit vlaue, so a range of unisgned integer between [0, 255] that will be enought for
	not production environment

*/

angular.module('stmath')

.factory('neuralNetwork', ['$http', function($http){

	// some enviroment vars
	var data;

	// define the basics functions
	var sigmoid = function(x, derivate = false){
		if (derivate == false)
			return 1/(1+math.exp(-x));
		return x * (1 - x);
	}

	// Input variables
	var alpha = 0.1
	var input_dim = 2
	var hidden_dim = 176
	var output_dim = 1

	// Initialize neural network weights
	var synapse_0 = math.multiply( 2, math.add( math.random([input_dim, hidden_dim]), -1) ) ;
	var synapse_1 = math.multiply( 2, math.add( math.random([hidden_dim, output_dim]), -1) ) ;
	var synapse_h = math.multiply( 2, math.add( math.random([hidden_dim, hidden_dim]), -1) ) ;

	var synapse_0_update = math.zeros( math.size(synapse_0) );
	var synapse_1_update = math.zeros( math.size(synapse_1) );
	var synapse_h_update = math.zeros( math.size(synapse_h) );

	// get data form sample json
	$http.get('json/sample_shiftsv2.json')
		.then(shiftsLoaded)
		.catch(shiftsLoadFailed)

	function intToBinaryArray(number){
		var binary = number.toString(2);
		var array = [];
		for (var i =  0; i < binary.length; i++) {
			// the binary number into an array
			array.push( parseInt(binary[i], 2) );
		}
		// adabt at 8 bit array
		var diff = 8 - array.length;
		for (i = 0; i < diff; i++){
			array.unshift(0);
		}

		return array;
	}

	function shiftsToSlot(shifts){
		var data = [];
		for (var i = 0; i < shifts.length; i++) {
			data.push(  shifts[i].slot );
		}
		return data;
	}

	function shiftsTo1WeekBit(shifts){
		var rec  = [];
		for (var i = 0; i < shifts.length; i++) {
			// needs to be converted like [7-13] slit 7 and 13, count 0 to 7, 7 to 13, 13 to 23 and add 0 nad 1 
			// ...
		}
		return rec;
	}

	/**
		Adjust data to be used in NN
		
		Return : array [ [ID] 8 bit, [7 days X 24 bit ] ]
	*/
	function shiftsLoaded(response){

		var elem = response.data[0];
		// id and shifts 
		var id = elem.id;
		var shifts = shiftsToSlot( elem.shifts );
		// creating the first matrix element for NN operation
		var a = math.matrix( intToBinaryArray( id ) );
		// 1 week rapresentation 
		var b = shiftsTo1WeekBit(shifts);

		// debugging
		data = b;
	}

	function shiftsLoadFailed (err){
		data = {error: true, message: err.toString()}
	}

	function getData(){return data;}

	// Training logic

	return {
		sigmoid,
		getData
	}

}])

// CONSOLE DEBUGGING FOT SERVICE
//  angular.element(document.body).injector().get('neuralNetwork')