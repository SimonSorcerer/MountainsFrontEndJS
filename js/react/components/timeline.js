/// <reference path="../../../typings/react/react.d.ts"/>

define(['react', 'components/addItem', 'components/timelineItem'], function (R, addItemComponent, timelineItemComponent) {
    return R.createClass({
        render: function () {
            var records = [],
                recordsElement,
                timelineAnchorElement = R.DOM.div({ className: 'anchor', key: 'timelineAnchor' }),
                addItemElement = R.createElement(addItemComponent, { key: 'addItem'}),
                children = [addItemElement, timelineAnchorElement];
            
            this.props.data.forEach(function (item) {
                item.key = item.id;
                records.push(R.createElement(timelineItemComponent, item));
            });
            
            if (records) {
                recordsElement = R.DOM.div({ className: 'records', key: 'records' }, records);
                children.push(recordsElement);
            }
            
            return R.DOM.div({ className: 'timeline' }, children);
        }
    });    
});

