var main = angular.module("main", ["ngRoute", "firebase"]);

main.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/news.html',
		controller: 'rosterController'
	})
	.when('/roster', {
		templateUrl: 'partials/roster.html',
		controller: 'rosterController'
	})
	.when('/apply', {
		templateUrl: 'partials/apply.html',
		controller: 'rosterController'
	})
	.when('/ranks', {
		templateUrl: 'partials/ranks.html',
		controller: 'rosterController'
	})
	.otherwise({
		redirectTo: '/'
	});
}])