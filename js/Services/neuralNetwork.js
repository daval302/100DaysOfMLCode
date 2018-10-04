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

		// Input variables
		var alpha = 0.1
		var input_dim = 11
		var middle_dim = 24
		var output_dim = 24

		/* WEB SERVICE HARDCODING: synapses and weight has to be loaded from server  */
		
		var synapse_1 = math.multiply( 2, math.add( math.random([input_dim, middle_dim]), -1) ) ;
		var synapse_2 = math.multiply( 2, math.add( math.random([middle_dim, output_dim]), -1) ) ;

		var synapse_1_update = math.zeros( math.size(synapse_1) );
		var synapse_2_update = math.zeros( math.size(synapse_2) );

		/* -- end -- WEB SERVICE HARDCODING */

	// define the basics functions

	var invbyelem = function(X){
		return math.matrix(X).map(function (value, index, matrix) {
  			return math.eval(1/value);
		}) 
	}

	var sigmoid = function(x, derivate = false){
		if (derivate == false)
			return math.matrix(/* math.divide(1, math.add( 1, math.exp( math.multiply(x, -1) ) ) ) */
			invbyelem(math.add( 1, math.exp( math.multiply(x, -1) ) ) )   
				);
			//return 1/(1+math.exp(-x));
		return  math.multiply( x, math.subtract(1, x) ) ;
		//return x * (1 - x);
	}

	var train = function(id, week_day, single_shift){
		
		var a = id;
		var b = week_day;
	    var c =  single_shift;

	    // best gues [24 bit]
	    var d =  math.zeros( [c.length] ) ;

	   	X = a.concat(b);
	   	y = c;

	   	/*  prototyping how should be

	   	var layer_1 = {
	   		'data' : sigmoid( math.multiply(X, synapse_1) ),
	   		'error' : null,
	   		'delta' : null
	   	}

	   	var layer_2 = {
	   		'data' : sigmoid( math.multiply(layer_1.data, synapse_2 ) ),
	   		'error' : math.subtract( y, layer_2.data ),
	   		'delta' : sigmoid(layer_2.data, true)
	   	}
	   	*/

	   	// DEBUGGING
	   	return {'X': X, 'y': y}
	}


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


		data = /*DEBUGGGING*/  train(
			formatData.intToBinaryArray( id ),
			formatData.toBitDayWeek(/*HARDCODING suppose to be interger from json*/),
			formatData.shiftTo24bit(single_shift = shifts[0]) /* ! HARDCODING ! suppose to be interation throw 1 week shift*/
			)
	}

	function shiftsLoadFailed (err){
		data = {error: true, message: err.toString()}
	}

	function getData(){return data;}

	/* HARDCODING will be used shiftGetter service instead */

	$http.get('json/sample_shiftsv2.json')
		.then(shiftsLoaded)
		.catch(shiftsLoadFailed)

	/* -- end --HARDCODING */

	// Training logic

	return {
		getData, sigmoid, invbyelem
	}

}])

// CONSOLE DEBUGGING FOT SERVICE
//  angular.element(document.body).injector().get('neuralNetwork')