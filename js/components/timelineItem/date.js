define(['react'], function (R) {
    return R.createClass({
		getMonthName: function(monthNumber) {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Oct', 'Dec'];
			
			return months[monthNumber - 1];
		},
		dateParser: function (jsonDate) {
			var date, year, month, day;
			
			if (!jsonDate) {
				return '';
			}
			
			date = new Date(jsonDate);
			year = date.getFullYear();
			month = this.getMonthName(date.getMonth());
			day = date.getDate() < 10 ? '0' + date.getDate(): date.getDate();
			
			return month + ' ' + day + ', ' + year;
		},
        render: function () {
			var text = this.props.value || '12.7.2015',
				style = {
					opacity: this.props.visible ? 1 : 0
				};
				
				text = this.dateParser(text);
			
			return R.DOM.div({ className: 'date', key: 'date', style: style }, text);
		}
	});
});