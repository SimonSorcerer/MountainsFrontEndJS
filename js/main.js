angular.module('mountains', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller: HomeController, templateUrl: 'home.html'}).
            when('/stats', {controller: StatsController, templateUrl: 'stats.html'}).
            otherwise({redirectTo: '/'});
    });