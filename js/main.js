angular.module('mountains', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller: HomeController, templateUrl: 'home.html'}).
            when('/detail/:id', {controller: HomeController, templateUrl:'home.html'}).
            otherwise({redirectTo: '/'});
    });