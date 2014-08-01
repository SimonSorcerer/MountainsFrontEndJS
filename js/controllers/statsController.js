function StatsController($scope) {
    var mountainsTable;

    $scope.stats = [];

    function getSourceTable() {
        var client,
            tableName = "mountains";

        client = new WindowsAzure.MobileServiceClient(
            "https://mountains.azure-mobile.net/",
            "mYGWhYQkkZtdvHrtxlCdwsmjqDwrTJ22"
        );

        return client.getTable(tableName);
    }

    function getTotalHeight(callback) {
        var totalHeight = 0;

        mountainsTable.where("").read().then(function (mountains) {
            mountains.forEach(function (item) {
                totalHeight += parseInt(item.height);
            });

            callback(totalHeight);
        });
    }

    function getStatistics() {
        $scope.loading = true;
        getTotalHeight(function (result) {
            $scope.stats.push({
                title: "total height",
                value: result
            });

            $scope.loading = false;
            $scope.$apply();
        });
    }

    $scope.init = function() {
        mountainsTable = getSourceTable();

        getStatistics();
    };
}