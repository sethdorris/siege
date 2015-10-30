main.controller("navcontroller", function ($scope) {
	
	$scope.menuButton = function () {
		$('#menuBtn').hide();
		$(".mainnavul").removeClass('closed');
		$(".mainnavul").addClass('active');

	}

	$scope.closeNav = function () {
		$('.mainnavul').removeClass('active');
		$('.mainnavlinks').removeClass('clickedLink')
		$('.mainnavul').addClass('closed');
		$('#menuBtn').show();
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

});  //This is the end of the Controller