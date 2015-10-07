main.controller("navcontroller", function ($scope) {
	
	$scope.menuButton = function () {
		$('#menuBtn').hide();
		$("nav > ul").removeClass('closed');
		$("nav > ul").addClass('active');

	}

	$scope.closeNav = function () {
		$('nav > ul').removeClass('active');
		$('nav > ul').addClass('closed');
		$('#menuBtn').show();
	}
	

});  //This is the end of the Controller