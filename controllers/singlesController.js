main.controller("singlesController", ["$scope", "$firebaseAuth", "$location", "$firebaseArray", "Auth", 
	function ($scope, $firebaseAuth, $location, $firebaseArray, Auth) {
		var ref = new Firebase("https://gtxtfantasy.firebaseio.com");
		var data = new Firebase("https://gtxtfantasy.firebaseio.com/users");
		var matches = new Firebase("https://gtxtfantasy.firebaseio.com/matches");
		var matchesArray = $firebaseArray(matches);
		var authData = ref.getAuth();
		var usersArray = $firebaseArray(data);
		$scope.inusePlayerName = false;
		$scope.inuseUid = false;
		$scope.challengedDate1;
		$scope.challengedTime1;
		$scope.firebaseUsersArray = $firebaseArray(data);
		console.log("firebase data", $scope.firebaseUsersArray.length)
		$scope.lastRank = ($scope.firebaseUsersArray.length + 2);
		console.log("Total Users in Ladder", $scope.lastRank);
		

		console.log("users array", usersArray);

		usersArray.$loaded()
		.then(function () {
			if (_.find(usersArray, "uid", authData.facebook.id)) {
				$scope.inuseUid = true;
			}
		});

		//Watches the Users Data for Users who leave the ladders and updates the ranking board
		data.on("child_removed", function (snapshot) {
	        console.log("snapshot", snapshot.val());
	        var rankOfLeft = snapshot.val().rank;
	        console.log("rank of left", rankOfLeft);
	        usersArray.$loaded()
	        .then(function () {
		        for (var i = 0; i < usersArray.length; i++) {
					if (usersArray[i].rank >= rankOfLeft) {
						usersArray[i].rank = usersArray[i].rank - 1;
						usersArray.$save(usersArray[i])
					}
		        }
	        })
	        //Deletes All Matches in the server involving the person who left
			matchesArray.$loaded()
			.then(function () {
				for (var i =0; i < matchesArray.length; i++) {
					if (matchesArray[i].challenger === snapshot.val().alias || matchesArray[i].gettingchallenged === snapshot.val().alias) {
						matchesArray.$remove(matchesArray[i]);
						matchesArray.$save();
					}
				}
			})

		});
		

		//Join singles competition button function
		//Adds new user to firebase
		$scope.joinSingles = function () {
			$scope.playername;
			
			//Check to see if the FB user and chosen alias already exists in the database
			usersArray.$loaded()
			.then(function () {
		        if (_.find(usersArray, "alias", $scope.playername)) {
		        	$scope.inusePlayerName = true;
		  
				} else {
					var newPlayer = {
						name: authData.facebook.displayName,
						alias: $scope.playername,
						uid: authData.facebook.id,
						rank: usersArray.length + 1,
						singlesW: 0,
						singlesL: 0		   
					} //End of the new player object
					data.child(authData.uid).set(newPlayer)
				} //End of the else statement
			})
		}; //End of the join singles function

		//Challenge a competitor Function Button
		$scope.challenge = function (users) {
			$scope.users = users;
			$scope.challengedUserRank = users.rank;
			$scope.challengedUserData = _.find(usersArray, "uid", users.uid)
			$scope.me = _.find(usersArray, "uid", authData.facebook.id);
		};

		$scope.submitChallenge = function () {
			
			//Reference to update the CHALLENGING USERS Challenges
			var challengesRef = new Firebase("https://gtxtfantasy.firebaseio.com/challenges");
			$scope.challengesArray = $firebaseArray(challengesRef);
			
			//Getting the date and converting to string
			var dateString = $scope.challengedDate1.toString();
			//Splitting the long date string and recreating it omitting the data not needed
			dateString = dateString.split(" ");
			console.log("date string", dateString);
			dateString = dateString[0] + " " + dateString[1] + " " + dateString[2];
			//Getting the time and converting to string
			var timeString = $scope.challengedTime1.toString();
			//Splitting the long time string and recreating it omitting the data not needed
			timeString = timeString.split(" ");
			timeString = timeString[4];
		    
		    $scope.challengesArray.$add({
		    	challenger: $scope.me.alias,
		    	challengerWins: $scope.me.singlesW,
		        challengerLosses: $scope.me.singlesL,
		        challengerrank: $scope.me.rank,
		    	gettingchallenged: $scope.users.alias,
		    	gettingchallengedW: $scope.users.singlesW,
		    	gettingchallengedL: $scope.users.singlesL,
		    	gettingchallengedrank: $scope.users.rank,
		    	accepted: false,
		    	date1: dateString,
		    	time1: timeString 
		    });
		} 


	}]);