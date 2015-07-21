/// <reference path="../../typings/react/react.d.ts"/>

define(['react', 'components/timeline', 'services/authManager', 'repositories/mountainRepository'], function (R, timelineComponent, authManager, mountainRepository) {
    var root = document.body,
        timelineData = [
            { id: 'Ram1', name: 'Rumburak', height: 2655 },
            { id: 'Rez2', name: 'Peprak', height: 470 },
            { id: 'Rtx3', name: 'Rumcajs', height: 2022 },
            { id: 'Raw4', name: 'Amalka', height: 5417 },
            { id: 'Reg5', name: 'Chocholousek', height: 1344 },
            { id: 'Rom6', name: 'K2', height: 8422 },
        ];

    function renderTimeline(data, parent) {
        var timelineElement = R.createElement(timelineComponent, { data: data })
        
        R.render(timelineElement, parent);
    }

    function login(onSuccess) {
        authManager.login().then(function (user) {
            console.log(user);
            onSuccess();
        });
    }
    
    login(function () {
        mountainRepository.all(function (data) {
            renderTimeline(data, root);
            console.log(data);
            console.log(timelineData);
        });
    });
});