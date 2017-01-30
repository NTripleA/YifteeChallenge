angular.module('users')
.factory('yifteeService', [
'$http',
function($http) {
	var yifteeService = {};
	yifteeService.getUsers = function (input) {
		return $http.get("http://yifteeqa.com/programming_challenge/autocomplete?q="+input)
		.then(function (response) {
		    console.log(response);
			return response.data;
		})
		.then(null, function (err) {
			console.error(err);
		});
	};

	return yifteeService;
}]);