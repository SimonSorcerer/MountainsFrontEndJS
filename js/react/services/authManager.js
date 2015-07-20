define(['services/azureClient'], function (azureClient) {
    function login(token) {
        return azureClient.login("facebook", token);
    };

    function isAuthenticated() {
        return !!azureClient.currentUser;
    };

    return {
        login: login,
        isAuthenticated: isAuthenticated
    };    
});