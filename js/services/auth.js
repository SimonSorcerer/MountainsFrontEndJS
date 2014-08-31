app.factory('AuthManager', function (MobileClient) {
    var authManager = {};

    authManager.login = function (token) {
        return MobileClient.login("facebook", token);
    };

    authManager.isAuthenticated = function () {
        return !!MobileClient.currentUser;
    };

    return authManager;
});