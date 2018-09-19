/**
	Lets define Input and output for the NN
	
	Defined shfit pattern as a 24 bit array that rapresent the working hours for a single shift.
		Example the slot [7-19] 12 hours shift will be rapresented as the following:
		[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0]
		where the 1 rapresent 1 hour range in the 24 hours day and 0 off time in 24 hours range
	
	Input : [ID] from DB in bit values , [shift pattern X 7 ] (168 bit) rapresent the entire week 
	Output : [shift pattern X 7 ] (168 bit)

	Note: [ID] from DB by default is a 4 byte size, so to reduce computational cost, I will rapresent in 
	Angular service as a 8 bit vlaue, so a range of unisgned integer of [0,255] that will be enought for
	not production environment

*/

angular.module('stmath')

.factory('neuralNetwork', ['shiftGetter', function(shiftGetter){

	// define the basics functions
	var sigmoid = function(x, derivate = false){
		if (derivate == false)
			return 1/(1+math.exp(-x));
		return x * (1 - x);
	}

	// input variables
	var alpha = 0.1
	var input_dim = 2
	var hidden_dim = 176
	var output_dim = 1

	return {
		sigmoid
	}

}])

// CONSOLE DEBUGGING FOT SERVICE
//  angular.element(document.body).injector().get('$neuralNetwork')