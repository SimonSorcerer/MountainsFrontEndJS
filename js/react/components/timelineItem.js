/// <reference path="../../../typings/react/react.d.ts"/>

define(['react', 'helpers/css', 'components/timelineItem/date', 'components/timelineItem/label', 'components/timelineItem/circle'], 
    function (R, cssHelper, dateComponent, labelComponent, circleComponent) {        
        
        return R.createClass({
            getInitialState: function() {
                return { 
                    detailsVisible: false
                };
            },
            handleMouseEnter: function (event) {
                this.setState({ detailsVisible: true });
            },
            handleMouseLeave: function (event) {
                this.setState({ detailsVisible: false });
            },
            render: function () {
                var recordAnchorElement = R.DOM.div({ className: 'anchor', key: 'anchor' }),
                    labelElement = R.createElement(labelComponent, {
                        name: this.props.name,
                        height: this.props.height
                    }),
                    dateElement = R.createElement(dateComponent, {
                        visible: this.state.detailsVisible,
                        value: this.props.date
                    }),
                    mountainCircleElement = R.createElement(circleComponent, {
                        height: this.props.height,
                        highlighted: this.state.detailsVisible
                    }),
                    domParams = {
                        className: cssHelper.classConcat('record', 'mountain'), 
                        key: 'record', 
                        onMouseEnter: this.handleMouseEnter,
                        onMouseLeave: this.handleMouseLeave 
                    };
                    
                return R.DOM.div(domParams, [ recordAnchorElement, dateElement, mountainCircleElement, labelElement ]);
            }
        });
});