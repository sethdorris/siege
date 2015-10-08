var main = angular.module("main", ["ngRoute", "firebase", "angular.filter"]);

main.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/callback.html',
		controller: 'welcomeController'
	})
	.when('/callback', {
		templateUrl: 'partials/callback.html',
		controller: 'welcomeController'
	})
	.when('/ppsingles', {
		templateUrl: 'partials/singles.html',
		controller: 'singlesController'
	})
	.when('/profile', {
		templateUrl: 'partials/profile.html',
		controller: 'profileController'
	})
	.otherwise({
		redirectTo: '/'
	});
}])