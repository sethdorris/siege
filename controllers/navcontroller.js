main.controller("navcontroller", ["$scope", "$firebaseAuth", 
	function ($scope, $firebaseAuth) {

	var ref = new Firebase("https://siege.firebaseio.com/");
	ref.onAuth(function (authdata) {
		$scope.authData = authdata.uid;
		console.log("$scop", $scope.authData);
	})
		
	
	$scope.menuButton = function () {
		$(".mainnavul").removeClass('closed');
		$(".mainnavul").addClass('active');
		$("#menuBtn").addClass('menuButtonFadeOut');
		$("#adminpanel").addClass('menuButtonFadeOut');
		$("#logout").addClass('menuButtonFadeOut');
	}

	$scope.closeNav = function () {
		$('.mainnavul').removeClass('active');
		$('.mainnavlinks').removeClass('clickedLink');
		$('.mainnavul').addClass('closed');
		$('#menuBtn').removeClass('menuButtonFadeOut');
		$('#adminpanel').removeClass("menuButtonFadeOut");
		$('#logout').removeClass('menuButtonFadeOut');
		$('#menuBtn').addClass('menuButtonFadeIn');
		$('#adminpanel').addClass("menuButtonFadeIn");
		$('#logout').addClass('menuButtonFadeIn');
	}
	
	$scope.newsLink = function () {
		$('#news').addClass('clickedLink');
	}

	$scope.rosterLink = function () {
		$('#roster').addClass('clickedLink');
	}

	$scope.ranksLink = function () {
		$('#ranks').addClass('clickedLink');
	}

	$scope.applyLink = function () {
		$('#apply').addClass('clickedLink');
	}

	$scope.forumsLink = function () {
		$('#forums').addClass('clickedLink');
	}

	$scope.login = function () {
		ref.authWithOAuthPopup("github", function (error, authData) {
		console.log("Auth Data", authData);
		$scope.authData = authData;
		auth.setAuth(1);
		});
	};

	$scope.loggedIn = function () {
		console.log($scope.authData);
		if ($scope.authData == null) {
			return false;
		} else {
			return true;
		}
	};

	$scope.logout = function () {
		$scope.authData = null;
		console.log($scope.authData);
	};

}]);  //This is the end of the Controller