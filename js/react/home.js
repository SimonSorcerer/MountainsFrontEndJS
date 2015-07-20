/// <reference path="../../typings/react/react.d.ts"/>

define(['react', 'components/timeline', 'services/authManager', 'repositories/mountainRepository'], function (R, timelineComponent, authManager, mountainRepository) {
    var root = document.body,
        timelineData = [
            { key: 'Ram1', name: 'Rumburak', height: 2655 },
            { key: 'Rez2', name: 'Peprak', height: 470 },
            { key: 'Rtx3', name: 'Rumcajs', height: 2022 },
            { key: 'Raw4', name: 'Amalka', height: 5417 },
            { key: 'Reg5', name: 'Chocholousek', height: 1344 },
            { key: 'Rom6', name: 'K2', height: 8422 },
        ];

    function renderTimeline(data, parent) {
        var timelineElement = R.createElement(timelineComponent, { data: data })
        
        R.render(timelineElement, parent);
    }

    function login() {
        
        authManager.login().then(function (user) {
            //$scope.user = user;
            //$scope.isAuthenticated = true;
            console.log(user.mobileServiceAuthenticationToken);
            //$scope.$apply()
            mountainRepository.all(function (data) {
                console.log(data);
            })
            renderTimeline(timelineData, root);
        });
    }
    
   // if (!authManager.isAuthenticated) {
        login();
   // } else {
   //     renderTimeline(timelineData, root);
   //     mountainRepository.all(function (data) {
   //             console.log(data);
   //         })
   // }
});