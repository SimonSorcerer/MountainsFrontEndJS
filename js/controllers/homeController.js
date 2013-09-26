function HomeController($scope) {
    $scope.mountains = [];

    $scope.init = function () {
/*        $scope.mountains = $http.get('http://localhost:3000/collections/mountains').success(function (data) {
            console.log(data);
            console.log('hello');
        }).error(function () {
            console.log('bye bye');
        });*/
        $scope.mountains = mountains_json;
    }

    $scope.populate = function(data, status, headers, config) {
        console.log(data);
    }

    $scope.sliderInit = function () {
    }
}