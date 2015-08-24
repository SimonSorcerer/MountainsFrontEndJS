define(['react', 'data/countries'], function (R, countries) {
    return R.createClass({
		getCountryName: function (countryCode) {
			return countries[countryCode] || '';
		},
        render: function () {
			var text = 'Country: ' + this.getCountryName(this.props.value),
				style = {
					opacity: this.props.visible ? 1 : 0
				};	
				
			return R.DOM.div({ className: 'country', key: 'country', style: style }, text);
		}
	});
});