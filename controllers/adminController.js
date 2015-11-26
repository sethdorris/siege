main.controller("adminController", ["$scope", "$firebaseAuth", "$firebaseArray",
	function ($scope, $firebaseAuth, $firebaseArray) {
		var newsref = new Firebase("https://siege.firebaseio.com/news");
		var applicationsref = new Firebase("https://siege.firebaseio.com/applications");
		var membersref = new Firebase("https://siege.firebaseio.com/members");
		$scope.news = $firebaseArray(newsref);
		$scope.applications = $firebaseArray(applicationsref);
		$scope.members = $firebaseArray(membersref);

		console.log($scope.news);
		console.log($scope.applications);
		console.log($scope.members);


}]);