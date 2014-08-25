app.service('MobileClient', function () {
    function getAzureClient() {
        return new WindowsAzure.MobileServiceClient(
            "https://mountains.azure-mobile.net/",
            "mYGWhYQkkZtdvHrtxlCdwsmjqDwrTJ22"
        );
    }

    return getAzureClient();
});