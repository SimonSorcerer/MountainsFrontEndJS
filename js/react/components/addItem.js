/// <reference path="../../../typings/react/react.d.ts"/>

define(['react', 'helpers/css', 'components/addItem/form'], function (R, cssHelper, addItemForm) {
    return R.createClass({
        getInitialState: function() {
            return { 
                formVisible: false
            };
        },
        toggleForm: function (event) {
            this.setState({ formVisible: !this.state.formVisible });
        },
        render: function () {
            var addNewElement = R.DOM.div({ 
                    className: cssHelper.classConcat('circle', 'add'),
                    key: 'addItemButton',
                    onClick: this.toggleForm 
                }, '+'),
                formElement = R.createElement(addItemForm, { visible: this.state.formVisible, toggleForm: this.toggleForm, key: 'newMountainForm' });
            
            return R.DOM.div({ className: 'record unselectable', key: 'addItem' }, [addNewElement, formElement]);
        }
    });
});