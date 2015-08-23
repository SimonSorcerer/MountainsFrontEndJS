/// <reference path="../../../typings/react/react.d.ts"/>

define(['react', 'helpers/css', 'components/timelineItem/date', 'components/timelineItem/label', 'components/timelineItem/circle', 'components/timelineItem/remove'], 
    function (R, cssHelper, dateComponent, labelComponent, circleComponent, removeComponent) {
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
                        key: 'label',
                        name: this.props.name,
                        height: this.props.height
                    }),
                    dateElement = R.createElement(dateComponent, {
                        key: 'date',
                        visible: this.state.detailsVisible,
                        value: this.props.date
                    }),
                    mountainCircleElement = R.createElement(circleComponent, {
                        key: 'circle',
                        height: this.props.height,
                        highlighted: this.state.detailsVisible
                    }),
                    removeElement = R.createElement(removeComponent, {
                        key: 'remove',
                        visible: this.state.detailsVisible,
                        updateData: this.props.updateData,
                        id: this.props.id
                    }),
                    domParams = {
                        className: cssHelper.classConcat('record', 'mountain'), 
                        key: 'record', 
                        onMouseEnter: this.handleMouseEnter,
                        onMouseLeave: this.handleMouseLeave 
                    };
                    
                return R.DOM.div(domParams, [ recordAnchorElement, dateElement, mountainCircleElement, labelElement, removeElement ]);
            }
        });
});