function LoginController($scope, $rootScope, EVENTS, AuthManager) {

    $scope.isAuthenticated = false;
    $scope.user = {
        userId: 'n/a'
    };

    $scope.login = function () {
        AuthManager.login().then(function (user) {
            $rootScope.$broadcast(EVENTS.auth.loginSuccess);

            $scope.user = user;
            $scope.isAuthenticated = true;
            $rootScope.token = user.mobileServiceAuthenticationToken;
            $scope.$apply()
        }, function () {
            $rootScope.$broadcast(EVENTS.auth.loginFailed);

            $scope.isAuthenticated = false;
            $scope.$apply()
        });
    };
}