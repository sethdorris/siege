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

		$scope.reject = function (app) {
			console.log("app", app)
			$scope.applications.$remove(app);
		}

		$scope.accept = function(app) {
			console.log("app", app);
			$scope.members.$add({
				gamertag: app.gamertag,
				timezone: app.timezone
			});
			$scope.applications.$remove(app);
		}

		$scope.edit = function(app) {
			
		}

		$scope.postNews = function () {
			var newsAuthor = $("#newsAuthor").val();
			var newsTitle = $("#newsTitle").val();
			var newsDate = $("#newsDate").val();
			var newsContent = $("#newsContent").val();
			console.log("newsAuthor", newsAuthor);
			console.log("newsTitle", newsTitle);
			console.log("newsDate", newsDate);
			console.log("newsContent", newsContent);
			$scope.news.$add({
				author: newsAuthor,
				content: newsContent,
				date: newsDate,
				title: newsTitle
			});
			newsAuthor = " ";
			newsTitle = " ";
			newsDate = " ";
			newsContent = " ";
		}

}]);