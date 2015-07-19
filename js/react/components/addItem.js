/// <reference path="../../../typings/react/react.d.ts"/>

define(['react', 'helpers/css'], function (R, cssHelper) {
    return R.createClass({
        render: function () {
            var addNewElement = R.DOM.div({ className: cssHelper.classConcat('circle', 'add') }, '+');
            
            return R.DOM.div({ className: 'record' }, addNewElement);
        }
    });
});