/// <reference path="../../../typings/react/react.d.ts"/>

define(['react', 'helpers/css'], function (R, cssHelper) {
    return R.createClass({
        handleClick: function (event) {
            
        },
        render: function () {
            var addNewElement = R.DOM.div({ className: cssHelper.classConcat('circle', 'add') }, '+'),
                nameElement = R.DOM.input({}),
                heightElement = R.DOM.input({}),
                countryElement = R.DOM.select({}),
                dateElement = R.DOM.input({ type: 'date' }),
                confirmButtonElement = R.DOM.button({ className: 'confirm' }, 'Confirm'),
                cancelButtonElement = R.DOM.button({ className: 'cancel' }, 'Cancel'),
                buttonHolderElement = R.DOM.div({ className: 'buttonHolder' }, [cancelButtonElement, confirmButtonElement]),
                formElement = R.DOM.div({ className: 'newItemContainer' }, [nameElement, heightElement, countryElement, dateElement, buttonHolderElement]);
            
            return R.DOM.div({ 
                className: 'record',
                onClick: this.handleClick
            }, [addNewElement, formElement]);
        }
    });
});