(function (angular) {
	'use strict';
	
	angular.module('stmath', []);

	var path = "js/";

 	$.getScript(path + 'directives/allDirectives.js');
 	$.getScript(path + 'services/shiftGetter.js');
 	$.getScript(path + 'services/neuralNetwork.js');
 	$.getScript(path + 'Controllers/MainController.js');
 	$.getScript(path + 'Controllers/EmployeeListController.js');
 	$.getScript(path + 'Controllers/LoginController.js');
 	$.getScript(path + 'Controllers/AddShiftController.js');

})(window.angular)