/// <reference path="../../../typings/react/react.d.ts"/>

define(['react'], function (R) {
    return R.createClass({
        render: function () {
			var text = this.props.name + ' (' + this.props.height + 'm)';
			
			return R.DOM.div({ className: 'label', key: 'label' }, text);
		}
	});
});