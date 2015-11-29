main.controller("rosterController", ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
	var ref = new Firebase("https://siege.firebaseio.com/members");
	$scope.members = $firebaseArray(ref);
}]);  //This is the end of the Controller