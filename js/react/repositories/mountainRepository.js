define(['services/azureClient'], function (azureClient) {
    var table = azureClient.tables.mountains;

    function find(filter, callback) {
        table.where(filter).read().then(function (mountains) {
            callback(mountains);
        });
    }

    function getAll(callback) {
        table.where("").orderByDescending("date").read().then(function (mountains) {
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