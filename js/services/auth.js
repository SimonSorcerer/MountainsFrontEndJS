app.factory('AuthManager', function (MobileClient) {
    var authManager = {};

    authManager.login = function (token) {
        return MobileClient.login("facebook", token).then(function () {
            return MobileClient.currentUser;
        });
    };

    authManager.isAuthenticated = function () {
        return !!MobileClient.currentUser;
    };

    return authManager;
});