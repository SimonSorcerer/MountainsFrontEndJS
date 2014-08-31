function HomeController($scope, $rootScope, $filter, AuthManager, MountainRepository) {
    $scope.mountains = [];

    function login() {
        AuthManager.login($rootScope.token).then(function () {
            refreshData();
        });
    }

    function refreshData() {
        $scope.loading = true;

        MountainRepository.all(function (results) {
            $scope.mountains = results;
            $scope.loading = false;
            $scope.$apply();
        });
    }

    function handleError(err) {
        console.error(err);
    }

    function setDefaultDate() {
        $scope.newMountain = {
            date: $filter("date")(Date.now(), 'yyyy-MM-dd')
        }
    }

    $scope.init = function() {
        login();
        setDefaultDate();
    };

    $scope.remove = function(id) {
        MountainRepository.remove({ id: id }, refreshData, handleError)
        console.log("Mountain (id: " + id + ") was removed");
    };

    function clearInput() {
        $scope.name = "";
        $scope.height = "";
        $scope.country = "";
    }

    $scope.add = function(form) {
        var newMountain = $scope.newMountain;

        if (form.$valid) {
            clearInput();

            MountainRepository.insert(newMountain, function (result) {
                console.log("Mountain added: " + result);
                refreshData();
            });
        }
   }
}