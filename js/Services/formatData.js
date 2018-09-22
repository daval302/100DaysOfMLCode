/**
	Angular Service able to decode and encode shifts in a appropriate format for a neruralNetwork service
*/

angular.module('stmath')

.factory('formatData', [ function(){

	var intToBinaryArray =  function (number){
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

	/**
		@return array of shifts pattern, example ["13-17", "7-13", "15-19"]
	*/

	var shiftsToSlot = function (shifts){
		var data = [];
		for (var i = 0; i < shifts.length; i++) {
			data.push(  shifts[i].slot );
		}
		return data;
	}

	/**
		@input : shifts as array 
		@return array of 168 bit that rapresent 1 week shifts patter
	*/

	var shiftsTo1WeekBit = function (shifts){
		var rec  = [];
		for (var i = 0; i < shifts.length; i++) {
			// needs to be converted like [7-13] slit 7 and 13, count 0 to 7, 7 to 13, 13 to 23 and add 0 nad 1 
			// slipt [7-13] into ['7', '17'] array
			var singled = shifts[i];
			if (singled == 'OFF'){
				for (var j = 0; j < 24; j++) rec.push(0);
			}else{
				var splitting = singled.split('-');
				var patt  =  { 'start' :  parseInt(splitting[0]), 'end': parseInt(splitting[1])} ;
				for (var j = 0; j < patt.start ; j++) rec.push(0);
				for (var j = patt.start; j <= patt.end ; j++) rec.push(1);
				for (var j = patt.end + 1; j < 24; j++) rec.push(0);
			}
		}
		return rec;
	}

	var shiftTo24bit = function(single24){
		var rec  = [];
		if (single24 == 'OFF'){
			for (var j = 0; j < 24; j++) rec.push(0);
		}else{
			var splitting = single24.split('-');
			var patt  =  { 'start' :  parseInt(splitting[0]), 'end': parseInt(splitting[1])} ;
			for (var j = 0; j < patt.start ; j++) rec.push(0);
			for (var j = patt.start; j <= patt.end ; j++) rec.push(1);
			for (var j = patt.end + 1; j < 24; j++) rec.push(0);
		}
		return rec; 
	}

	/* !! HARDCODING !! Data genereator ot be implemented in another service  */

	var getRandomInt = function(max) {
  		return Math.floor(Math.random() * Math.floor(max));
	}

	var toBitDayWeek = function(day_week){
		var ret;
		if (day_week == null) 
			ret  = getRandomInt(6).toString(2).split('');
		else 
			ret = parseInt(day_week).toString(2).split('');

		var len = 3 - ret.length;
		for (var i = 0; i < len; i++)
			ret.unshift('0');
		for (var i = 0; i < ret.length; i++) 
			ret[i] = parseInt( ret[i] );
		return ret;
	}

	/* end -- !! HARDCODING !! Data genereator ot be implemented in another service  */

	// NONE PURPOSE
	var decode1Day = function (bits){
		var singled = {};
		var prev = bits[0];
		for (var i = 1; i < 24/*one day*/; i++) {

			if (prev == 1 && bits[i] == 1){
				// nothing 
			}else if (prev == 1 && bits[i] == 0){
				singled.end = i - 1 ;
			}else if(prev == 0 && bits[i] == 0){
				// nothing
			}else if (prev == 0 && bits[i] == 1){
				singled.start = i;
			}

			prev= bits[i];
		
		} // end for 

		if (singled.start == null && singled.end == null)
			return "OFF";
		else
			return singled.start.toString() + "-" + singled.end.toString();
	}

	// NONE	PURPOE 
	var decode1WeekBit = function (bits){
		var ret = [];
		ret.push(bits.splice)
		return bits.splice(0,24);
	}

	return {
		shiftsToSlot, intToBinaryArray, toBitDayWeek, shiftTo24bit, decode1Day
	}

}])