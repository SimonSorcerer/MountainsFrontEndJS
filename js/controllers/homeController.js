function HomeController($scope) {
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

    function refresh() {
        mountainsTable.where("").read().then(function (mountains) {
            $scope.mountains = mountains;
            $scope.$apply();
        });
    }

    function handleError(err) {
        console.error(err);
    }

    $scope.init = function() {
        mountainsTable = getSourceTable();

        refresh();
    };

    $scope.delete = function(id) {
        mountainsTable.del({ id: id }).then(refresh, handleError);

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
                refresh();
            });
        }
   }
}