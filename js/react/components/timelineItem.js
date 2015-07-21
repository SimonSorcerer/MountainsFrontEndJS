/// <reference path="../../../typings/react/react.d.ts"/>

define(['react', 'helpers/css'], function (R, cssHelper) {
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
    
    return R.createClass({
        render: function () {
            var text = this.props.name + ' (' + this.props.height + 'm)',
                recordAnchorElement = R.DOM.div({ className: 'anchor', key: 'anchor' }),
                dateElement = R.DOM.div({ className: 'date', key: 'date' }, this.props.date || '12.7.2015'),
                labelElement = R.DOM.div({ className: 'label', key: 'label' }, text),
                circleSize = getMountainDomSize(this.props.height),
                mountainCircleStyles = {
                    width: circleSize, 
                    height: circleSize,
                    left: 141 - Math.floor(circleSize/2)
                },
                mountainCircleElement = R.DOM.div({ className: 'circle', style: mountainCircleStyles, key: 'circle' });
                
                function onMouseOver(event) {
                    console.log(event);
                }
                
            return R.DOM.div(
                {   
                    className: cssHelper.classConcat('record', 'mountain'), 
                    key: 'record', 
                    onMouseOver: onMouseOver 
                },
                [ recordAnchorElement, dateElement, mountainCircleElement, labelElement ]
            );
        }
    });
});