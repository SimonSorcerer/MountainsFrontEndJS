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

    function validate(mountain) {
        var errors = [];

        if (!mountain.name) {
            errors.push({
                text: "Please enter name for new mountain"
            });
        }

        if (!mountain.height) {
            errors.push({
               text: "Please enter height of the mountain"
            });
        } else if (!isNumber(mountain.height)) {
            errors.push({
                text: "Height of the mountain should be in numeric format"
            });
        } else if (!isGreaterThanZero(mountain.height)) {
            errors.push({
                text: "Height of the mountain should be greater than zero"
            });
        }

        if (!mountain.country) {
            errors.push({
                text: "Please enter country for new mountain"
            });
        }

        $scope.errors = errors;
        return errors.length === 0;
    }

    function clearErrors() {
        $scope.errors = [];
    }

    function clearInput() {
        $scope.name = "";
        $scope.height = "";
        $scope.country = "";
    }

    $scope.add = function() {
        var newMountain = {
            name: $scope.name,
            height: $scope.height,
            country: $scope.country
        };

        if (validate(newMountain)) {
            clearInput();
            clearErrors();

            mountainsTable.insert(newMountain).then(function (item) {
                console.log("Mountain added: " + item);
                refresh();
            });
        }
   }
}