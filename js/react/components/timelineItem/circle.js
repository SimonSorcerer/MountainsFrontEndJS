function getMountainDomSize(size) {
    // function to map mountain size to circle size on the page
    // should be unit tested for specifications
    var reducedSize = Math.round(Math.sqrt(size));
    
    if (reducedSize < 6)
        return 6;
    
    if (reducedSize > 100)
        return 100;
    
    return reducedSize;
}

define(['react', 'helpers/css'], function (R, cssHelper) {
    return R.createClass({
        render: function () {
			var circleSize = getMountainDomSize(this.props.height),
                className = this.props.highlighted ? cssHelper.classConcat('circle', 'circleHovered') : 'circle',
				style = {
                    width: circleSize, 
                    height: circleSize,
                    left: 141 - Math.floor(circleSize/2)
				};
			
			return R.DOM.div({ className: className, style: style, key: 'circle' });
		}
	});
});