var app = angular.module('mountains', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller: HomeController, templateUrl: 'home.html', data: {
                authRequired: true
            }}).
            when('/stats', {controller: StatsController, templateUrl: 'stats.html'}).
            when('/login', {controller: LoginController, templateUrl: 'login.html'}).
            otherwise({redirectTo: '/'});
    });

app.run(function ($rootScope, EVENTS, AuthManager) {
    $rootScope.$on('$locationChangeStart', function (event, nextUrl) {
        var authRequired = false;

        if (nextUrl.data) {
            authRequired = nextUrl.data.authRequired;
        }

        if (!AuthManager.isAuthenticated() && authRequired) {
            $rootScope.$broadcast(EVENTS.auth.notAuthenticated);
            event.preventDefault();
        }
    });
});