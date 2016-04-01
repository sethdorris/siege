main.controller("newsController", ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
	var ref = new Firebase("https://siege.firebaseio.com/news");
	var messageRef = new Firebase("https://siege.firebaseio.com/messages");
	$scope.news = $firebaseArray(ref);
	$scope.messages = $firebaseArray(messageRef);
	console.log("news", $scope.news);
	
	$scope.postMessage = function() {
		console.log("Firing")
		var username = $("#chatboxUsername").val();
		var messagecontent = $("#chatboxMessage").val();
		$scope.messages.$add({
			username: username,
			message: messagecontent
		});
	}

}]);  //This is the end of the Controller