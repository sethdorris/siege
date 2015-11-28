main.controller("newsController", ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
	var ref = new Firebase("https://siege.firebaseio.com/news");
	$scope.news = $firebaseArray(ref);
	console.log("news", $scope.news);

}]);  //This is the end of the Controller