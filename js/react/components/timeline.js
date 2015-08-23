/// <reference path="../../../typings/react/react.d.ts"/>

define(['react', 'components/addItem', 'components/timelineItem', 'repositories/mountainRepository'], function (R, addItemComponent, timelineItemComponent, mountainRepository) {
    return R.createClass({
        updateData: function () {
            var self = this;
            
            mountainRepository.all(function (data) {
                self.setProps({ data: data });
            });
        },
        render: function () {
            var self = this,
                records = [],
                recordsElement,
                timelineAnchorElement = R.DOM.div({ className: 'anchor', key: 'timelineAnchor' }),
                addItemElement = R.createElement(addItemComponent, { key: 'addItem', updateData: this.updateData }),
                children = [addItemElement, timelineAnchorElement];
            
            this.props.data.forEach(function (item) {
                item.key = item.id;
                item.updateData = self.updateData,
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

