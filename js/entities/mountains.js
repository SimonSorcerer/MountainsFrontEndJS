app.service('Mountains', function (MobileClient) {
    var tableName = 'mountains';

    function getSourceTable() {
        return MobileClient.getTable(tableName);
    }

    function find(filter) {
        mountainsTable.where("").read().then(function (mountains) {
            $scope.mountains = mountains;
            $scope.loading = false;
            $scope.$apply();
        });
    }

    function getAll() {
        mountainsTable.where("").read().then(function (mountains) {
            $scope.mountains = mountains;
            $scope.loading = false;
            $scope.$apply();
        });
    }

    function insert(mountain) {
        mountainsTable.insert(mountain).then(function (item) {
            console.log("Mountain added: " + item);
            refreshData();
        });
    }

    function update(id, mountain) {

    }

    function remove(id) {
        mountainsTable.del({ id: id }).then(refreshData, handleError);
    }

    return {
        find: find,
        all: getAll,
        insert: insert,
        update: update,
        remove: remove
    };
});