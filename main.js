var main = angular.module("main", ["ngRoute", "firebase"]);

main.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/news.html',
		controller: 'newsController'
	})
	.when('/roster', {
		templateUrl: 'partials/roster.html',
		controller: 'rosterController'
	})
	.when('/apply', {
		templateUrl: 'partials/apply.html',
		controller: 'applyController'
	})
	.when('/ranks', {
		templateUrl: 'partials/ranks.html',
		controller: 'rosterController'
	})
	.when('/adminpanel', {
		templateUrl: 'partials/adminpanel.html',
		controller: 'adminController'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);


