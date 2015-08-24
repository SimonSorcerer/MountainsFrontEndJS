define(['services/azureClient'], function (azureClient) {
    function login() {
        return azureClient.login("facebook");
    };

    function isAuthenticated() {
        return !!azureClient.currentUser;
    };

    return {
        login: login,
        isAuthenticated: isAuthenticated
    };    
});