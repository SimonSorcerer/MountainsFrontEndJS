app.service('MountainRepository', function (MobileClient) {
    var table = MobileClient.tables.mountains;

    function find(filter) {
        table.where(filter).read().then(function (mountains) {
            $scope.mountains = mountains;
            $scope.loading = false;
            $scope.$apply();
        });
    }

    function getAll(callback) {
        table.where("").read().then(function (mountains) {
            callback(mountains);
        });
    }

    function insert(mountain, callback) {
        table.insert(mountain).then(function (item) {
            callback(item);
        });
    }

    function remove(filter, successCallback, errorCallback) {
        table.del(filter).then(successCallback, errorCallback);
    }

    return {
        find: find,
        all: getAll,
        insert: insert,
        remove: remove
    };
});