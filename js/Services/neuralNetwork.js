/**
	Lets define Input and output for the NN
	
	Defined shfit pattern as a 24 bit array that rapresent the working hours for a single shift.
		Example the slot [7-19] 12 hours shift will be rapresented as the following:
		[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0]
		where the 1 rapresent 1 hour range in the 24 hours day and 0 off time in 24 hours range
	
	Input : [ID] from DB in bit values , num[ 1-7] (3 bit) rapresent a week day
	Output : [day pattern ] (24 bit)

	BITTING : 8 + 3 = 24

	Note: [ID] from DB by default is a 4 byte size, so to reduce computational cost, I will rapresent in 
	Angular service as a 8 bit vlaue, so a range of unisgned integer between [0, 255] that will be enought for
	not production environment

*/

angular.module('stmath')

.factory('neuralNetwork', ['$http', 'formatData', function($http, formatData){

	// some enviroment vars
	var data;

	// define the basics functions
	function sigmoid(x, derivate = false){
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

	/* HARDCODING will be used shiftGetter service instead */
	$http.get('json/sample_shiftsv2.json')
		.then(shiftsLoaded)
		.catch(shiftsLoadFailed)


	/**
		Adjust data to be used in NN
		
		Return : array [ [ID] 8 bit, [7 days X 24 bit ] ]
	*/
	function shiftsLoaded(response){

		/* !! HARDCODING !! 
			make another service that emulate a sinle week employe picking up
			that will go in elem as following 
		*/

		var elem = /* DEBUGGING on 1 single employee */response.data[0]; 
		// id and shifts 
		var id = elem.id;
		var shifts = formatData.shiftsToSlot( elem.shifts );

		/* !! HARDCODING  !!
			Assume product ID X [1-7] endoded in bit :
				00000001 X 001 => 000000011111111111110000 
		*/

		/* ! HARDCODING ! suppose to be interation throw 1 week shift*/ var single_shift = shifts[0];

		// creating the first matrix element for NN operation
		var a = math.matrix( formatData.intToBinaryArray( id ) ); // OK
		// [1-7] week day rapresentation 
		var b = formatData.toBitDayWeek(/*HARDCODING suppose to be interger from json*/);

	    // NN output shift [24 bit]
	    c = formatData.shiftTo24bit(single_shift);

	    // ... initializa synapses and errors ...

		// debugging
		//data = { oring : shifts[0], decoded: decode1WeekBit(b) };
		data = {'original': single_shift, 'decoded': formatData.decode1Day(c)}; // OK
	}

	function shiftsLoadFailed (err){
		data = {error: true, message: err.toString()}
	}

	function getData(){return data;}

	// Training logic

	return {
		getData
	}

}])

// CONSOLE DEBUGGING FOT SERVICE
//  angular.element(document.body).injector().get('neuralNetwork')