main.controller("welcomeController", ["$scope", "$firebaseAuth", "$firebaseArray", "Auth", function ($scope, $firebaseAuth, $firebaseArray, Auth) {
	var matchesRef = new Firebase("https://gtxtfantasy.firebaseio.com/matches");
	$scope.matchesArray = $firebaseArray(matchesRef);

	$scope.upcomingMatch;

	var matchTotal = 100;

	$scope.matchesArray.$loaded()
	.then(function () {
		for (var i = 0; i < $scope.matchesArray.length; i++) {
			if ($scope.matchesArray[i].reported === false) {
				var rank1;
				var rank2;
				var total;
				
				rank1 = $scope.matchesArray[i].challengerrank;
				console.log("rank1", rank1);
				rank2 = $scope.matchesArray[i].gettingchallengedrank;
				console.log("rank2", rank2);
				total = rank1 + rank2;
				console.log("total", total);
				console.log(matchTotal);

				if (total < matchTotal) {
					$scope.upcomingMatch = $scope.matchesArray[i];
				}
			}
			
		}
		console.log("$scope upcomingMatch", $scope.upcomingMatch)
	});



}]);  //This is the end of the Controller