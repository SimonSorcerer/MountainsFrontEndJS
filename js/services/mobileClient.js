app.service('MobileClient', function () {
    var tableName = 'mountains';

    function getSourceTable() {
        return MobileClient.getTable(tableName);
    }


    function getAzureClient() {
        return new WindowsAzure.MobileServiceClient(
            "https://mountains.azure-mobile.net/",
            "mYGWhYQkkZtdvHrtxlCdwsmjqDwrTJ22"
        );
    }

    return getAzureClient();

    return {
        client: getAzureClient(),
        tables: {
            mountains: getSourceTable('mountains')
        }
    }
});