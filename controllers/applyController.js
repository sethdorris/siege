main.controller("applyController", ["$scope", "$firebaseAuth", "$firebaseArray",
	function ($scope, $firebaseAuth, $firebaseArray) {
		var applicationsref = new Firebase("https://siege.firebaseio.com/applications");
		$scope.applications = $firebaseArray(applicationsref);

		

}]);