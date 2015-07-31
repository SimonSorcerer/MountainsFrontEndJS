/// <reference path="../../typings/react/react.d.ts"/>

define(['react', 'components/timeline', 'services/authManager', 'repositories/mountainRepository'], function (R, timelineComponent, authManager, mountainRepository) {
    var root = document.body;

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
        });
    });
});