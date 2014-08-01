function HomeController($scope, $filter) {
    $scope.mountains = [];

    var mountainsTable;

    function getSourceTable() {
        var client,
            tableName = "mountains";

        client = new WindowsAzure.MobileServiceClient(
            "https://mountains.azure-mobile.net/",
            "mYGWhYQkkZtdvHrtxlCdwsmjqDwrTJ22"
        );

        return client.getTable(tableName);
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
        mountainsTable = getSourceTable();

        setDefaultDate();
        refreshData();
    };

    $scope.remove = function(id) {
        mountainsTable.del({ id: id }).then(refreshData, handleError);

        console.log("Mountain (id: " + id + ") was removed");
    };

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function isGreaterThanZero(n) {
        return isNumber(n) && n > 0;
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