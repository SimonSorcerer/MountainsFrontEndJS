/// <reference path="../../../typings/react/react.d.ts"/>

define(['react'], function (R) {
    return R.createClass({
        render: function () {
			var text = this.props.value || '12.7.2015',
				style = {
					opacity: this.props.visible ? 1 : 0
				};
			
			return R.DOM.div({ className: 'date', key: 'date', style: style }, text);
		}
	});
});