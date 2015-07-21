/* global requirejs */

requirejs.config({
    baseUrl: 'js/react',
    paths: {
        'react': 'https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react',
        'WindowsAzure': 'http://ajax.aspnetcdn.com/ajax/mobileservices/MobileServices.Web-1.2.5'
    }
});

requirejs(['home']);

define('MobileServiceClient', ['WindowsAzure'], function () {
    return WindowsAzure.MobileServiceClient;
})