main.controller("navcontroller", ["$scope", "$firebaseAuth", "$location", "Auth", function ($scope, $firebaseAuth, $location, Auth) {
	
	var ref = new Firebase("https://gtxtfantasy.firebaseio.com");
	
//Checks to see if a user is authenticated, if user isn't authenticated, $scope.Auth set to false
//If user is authenticated and logged in, $scope.Auth is true and then userName is generated

	if (!ref.getAuth()) {
		$scope.Auth = false
		$location.path("/")
	} else {
		$scope.userName = ref.getAuth();
		$scope.userName = $scope.userName.facebook.displayName;
		$scope.userName = $scope.userName.split(" ");
		$scope.userName = $scope.userName[0];
		$scope.Auth = true;
	}

	$scope.logout = function () {
		ref.unauth();
		$scope.Auth = false;
		$scope.userName = "";
		$location.path("/");
	};

	$scope.login = function () {
		//Calls the setUid function in Auth, which is the AUTH POPUP
		var promise = Auth.setUid();
		promise.then(function () {
			$scope.userName = ref.getAuth();
			$scope.userName = $scope.userName.facebook.displayName;
			$scope.userName = $scope.userName.split(" ");
			$scope.userName = $scope.userName[0];
			$scope.Auth = true;
			//Code to redirect
			$location.path("/callback");

		});
	};

}]);  //This is the end of the Controller