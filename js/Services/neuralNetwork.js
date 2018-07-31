angular.module('stmath')

.factory('neuralNetwork', ['shiftGetter', function(shiftGetter){

	// define the basics functions
	var sigmoid = function(x, derivate = false){
		if (derivate == false)
			return 1/(1+math.exp(-x));
		return x * (1 - x);
	}

	return {
		sigmoid
	}

}])

// CONSOLE DEBUGGING FOT SERVICE
//  angular.element(document.body).injector().get('$neuralNetwork')