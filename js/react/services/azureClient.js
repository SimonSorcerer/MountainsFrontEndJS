define(['MobileServiceClient'], function (MobileServiceClient) {
    var client = initializeAzureClient(),
        tableName = 'mountains';

    function getSourceTable() {
        return client.getTable(tableName);
    }


    function initializeAzureClient() {
        return new MobileServiceClient(
            "https://mountains.azure-mobile.net/",
            "mYGWhYQkkZtdvHrtxlCdwsmjqDwrTJ22"
        );
    }

    function login(service, token) {
        return client.login(service, token);
    }

    return {
        login: login,
        currentUser: client.currentUser,
        tables: {
            mountains: getSourceTable('mountains')
        }
    }
});