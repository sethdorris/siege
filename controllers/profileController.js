main.controller("profileController", ["$scope", "$firebaseAuth", "$location", "$firebaseArray", "$firebaseObject", "Auth", 
	function ($scope, $firebaseAuth, $location, $firebaseArray, $firebaseObject, Auth) {
		var ref = new Firebase("https://gtxtfantasy.firebaseio.com");
		var challengesRef = new Firebase("https://gtxtfantasy.firebaseio.com/challenges");
		var matchesRef = new Firebase("https://gtxtfantasy.firebaseio.com/matches");
		var usersRef = new Firebase("https://gtxtfantasy.firebaseio.com/users");
		$scope.usersArray = $firebaseArray(usersRef);
		$scope.matchesArray = $firebaseArray(matchesRef);
		$scope.challengesArray = $firebaseArray(challengesRef);
		$scope.me = ref.getAuth();
		$scope.me = $scope.me.facebook.displayName;
		$scope.me = $scope.me.split(" ");
		$scope.me = $scope.me[0];
		$scope.matchBeingReported;
		$scope.myScore;
		$scope.oppScore;
		var uidLookUp = ref.getAuth();
		
		//Display Profile Card
		//First find the record of the user who is logged and set it as a scope variable
		$scope.usersArray.$loaded()
		.then(function () {
			$scope.myProfileInformation = _.find($scope.usersArray, "uid", uidLookUp.facebook.id);
			console.log("my profile information", $scope.myProfileInformation.alias);
		});


		$scope.cancel = function (challenge) {
			console.log("challenge", challenge.$id);
			$scope.challengesArray.$remove(challenge);
		};

		$scope.accept = function (challenge) {
			console.log("challenge accepted", challenge);
			var challengerUserRef = _.find($scope.usersArray, "alias", challenge.challenger);
			var gettingchallengedUserRef = _.find($scope.usersArray, "alias", challenge.gettingchallenged);
			$scope.matchesArray.$add({
				challenger: challenge.challenger,
				challengerscore: "",
				challengerrank: challenge.challengerrank,
				challengerwins: challengerUserRef.singlesW,
				challengerlosses: challengerUserRef.singlesL,
				gettingchallenged: challenge.gettingchallenged,
				gettingchallengedscore: "",
				gettingchallengedrank: challenge.gettingchallengedrank,
				gettingchallengedwins: gettingchallengedUserRef.singlesW,
				gettingchallengedlosses: gettingchallengedUserRef.singlesL,
				reported: false,
				date1: challenge.date1,
				time1: challenge.time1
			});

			$scope.challengesArray.$remove(challenge);
		};

		$scope.report = function (match) {
			//sets $scope.matchBeingReported to match so that I can use this match data in the modal
			$scope.matchBeingReported = match;
		};

		$scope.reportResults = function () {
			//Code to find the records for the two involved in the match to update Singles W/L and Rank;
			var challengerUserRef = _.find($scope.usersArray, "alias", $scope.matchBeingReported.challenger);
			var gettingchallengedUserRef = _.find($scope.usersArray, "alias", $scope.matchBeingReported.gettingchallenged);
			var userRanksToUpdate = [];

			//This sets the match has having been reported and disables report button
			$scope.matchBeingReported.reported = true;

			//Updating matches in database with the score reported
			$scope.matchBeingReported.challengerscore = $scope.oppScore;
			$scope.matchBeingReported.gettingchallengedscore = $scope.myScore;
			//Code to determine the winner of the match
			if ($scope.oppScore > $scope.myScore) {
				challengerUserRef.singlesW += 1;
				gettingchallengedUserRef.singlesL += 1;
			// IF STATEMENT to determine if the challenger played someone of higher rank and won to earn that rank 
			// and remember that the LOWER the rank THE BETTER
			    if (challengerUserRef.rank > gettingchallengedUserRef.rank) {
					challengerUserRef.rank = gettingchallengedUserRef.rank;
					gettingchallengedUserRef.rank += 1;
					
					//For loop to update the rest of the users ranks
					for (var i = 0; i < $scope.usersArray.length; i++) {
						if (($scope.usersArray[i].alias !== challengerUserRef.alias) && ($scope.usersArray[i].alias !== gettingchallengedUserRef.alias) && ($scope.usersArray[i].rank >= gettingchallengedUserRef.rank)) {
							console.log("For loop working", $scope.usersArray[i])
							$scope.usersArray[i].rank += 1;
							$scope.usersArray.$save($scope.usersArray[i]);
						}//closes IF statement inside FOR LOOP
					} //closes FOR LOOP
				}// closes the nested IF statement
			} else if ($scope.oppScore < $scope.myScore) {
				challengerUserRef.singlesL += 1;
				gettingchallengedUserRef.singlesW += 1;
			}

			//Save MATCHES AND USERS in Server
			$scope.usersArray.$save(challengerUserRef);
			$scope.usersArray.$save(gettingchallengedUserRef);
			$scope.matchesArray.$save($scope.matchBeingReported);


		};

	}]);