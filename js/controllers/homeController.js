function HomeController($scope, $rootScope, $filter, AuthManager, MobileClient) {
    $scope.mountains = [];

    var mountainsTable;

    function getSourceTable() {
        var tableName = 'mountains';

        return MobileClient.getTable(tableName);
    }

    function login() {
        AuthManager.login($rootScope.token).then(function () {
            refreshData();
        });
    }

    function refreshData() {
        $scope.loading = true;

        mountainsTable.where("").read().then(function (mountains) {
            $scope.mountains = mountains;
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
        mountainsTable = getSourceTable();

        setDefaultDate();
    };

    $scope.remove = function(id) {
        mountainsTable.del({ id: id }).then(refreshData, handleError);

        console.log("Mountain (id: " + id + ") was removed");
    };

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function clearInput() {
        $scope.name = "";
        $scope.height = "";
        $scope.country = "";
    }

    $scope.add = function(form) {
        var newMountain = $scope.newMountain;

        if (form.$valid) {
            clearInput();

            mountainsTable.insert(newMountain).then(function (item) {
                console.log("Mountain added: " + item);
                refreshData();
            });
        }
   }
}