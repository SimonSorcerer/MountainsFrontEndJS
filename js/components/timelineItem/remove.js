define(['react', 'repositories/mountainRepository'], function (R, mountainRepository) {
    return R.createClass({
		removeItem: function () {
			var self = this, 
				id = self.props.id;
			
			if (id) {
				mountainRepository.remove({ id: this.props.id }, function () {
					self.props.updateData();
					console.log("Mountain (id: " + id + ") was removed");
				});
			}
		},
        render: function () {
			var style = {
					opacity: this.props.visible ? 1 : 0
				}
				
			return R.DOM.div({
				className: 'remove', 
				style: style, key: 'remove',
				alt: 'remove item',
				title: 'remove item',
				onClick: this.removeItem
			}, 'x');
		}
	});
});