main.factory("Auth", ["$rootScope", "$firebaseAuth", "$q",
	function ($rootScope, $firebaseAuth, $q) {
		var uid;
		var authInfo;
		var ref = new Firebase("https://gtxtfantasy.firebaseio.com");
		var deferred = $q.defer();

		return {
			setUid: function() {
				ref.authWithOAuthPopup("facebook", function (error, authData) {
					if (error) {
						console.log("error", error)
					} else {
						console.log("this", authData)
						uid = authData.uid;
						authInfo = authData;
						console.log("UID", uid);
						deferred.resolve();
					}
				})
				return deferred.promise;
			}
		}
}]);