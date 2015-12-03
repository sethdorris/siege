main.controller("applyController", ["$scope", "$firebaseAuth", "$firebaseArray",
	function ($scope, $firebaseAuth, $firebaseArray) {
		var applicationsref = new Firebase("https://siege.firebaseio.com/applications");
		$scope.applications = $firebaseArray(applicationsref);

		$scope.submit = function () {
			var appEmail = $('#appEmail').val();
			var appGamertag = $('#appGamertag').val();
			var appTime = $("#appTime").val();
			var appAge = $("#appAge").val();
			var appOccupation = $("#appOccupation").val();
			var appMic = $("input[name=mic]:checked").val();

			$scope.applications.$add({
				age: appAge,
				email: appEmail,
				gamertag: appGamertag,
				timezone: appTime,
				occupation: appOccupation,
				mic: appMic
			}).then(function (data) {
                $("#submitApp").addClass("successful");
                $("#submitApp").text("SUCCESS!")
			});
		};

}]);