/// <reference path="../../typings/react/react.d.ts"/>

var root = document.body,
    R = React,
    DOM = R.DOM,
    timelineData = [
        { name: 'Rumburak', height: 2655 },
        { name: 'Peprak', height: 470 },
        { name: 'Rumcajs', height: 2022 },
        { name: 'Amalka', height: 5417 },
        { name: 'Chocholousek', height: 1344 }
    ],
    components = {},
    categories = {
        epic: 'epic',
        big: 'big',
        medium: 'medium',
        small: 'small',
        tiny: 'tiny'
    };

function getMountainCategory(size) {
    if (size > 7000) {
        return categories.epic;
    } else if (size > 5000) {
        return categories.big;
    } else if (size > 2000) {
        return categories.medium;
    } else if (size > 1000) {
        return categories.small;
    }    
    return categories.tiny; 
}

function classConcat() {
    var args = Array.prototype.slice.call(arguments);
    
    return args.join(' ');
}

components.addItem = R.createClass({
    render: function () {
        var addNewElement = DOM.div({ className: classConcat('circle', 'add') }, '+');
        
        return DOM.div({ className: 'record' }, addNewElement);
    }
});

components.timelineItem = R.createClass({
    render: function () {
        var text = this.props.name + ' (' + this.props.height + 'm)',
            mountainCategory = getMountainCategory(this.props.height),
            recordAnchorElement = DOM.div({ className: 'anchor' }),
            labelElement = DOM.div({ className: 'label' }, text),
            mountainCircleElement = DOM.div({ className: classConcat('circle', mountainCategory) });
            
        return DOM.div({ className: classConcat('record', 'mountain') }, [recordAnchorElement, mountainCircleElement, labelElement]);
    }
});

components.timeline = R.createClass({
    render: function () {
        var records = [],
            recordsElement,
            timelineAnchorElement = DOM.div({ className: 'anchor' }),
            addItemElement = R.createElement(components.addItem),
            children = [addItemElement, timelineAnchorElement];
        
        this.props.data.forEach(function (item) {
            records.push(R.createElement(components.timelineItem, item));
        });
        
        if (records) {
            recordsElement = DOM.div({ className: 'records' }, records);
            children.push(recordsElement);
        }
        
        return DOM.div({ className: 'timeline' }, children);
    }
});

function renderTimeline(data, parent) {
    var timelineElement = R.createElement(components.timeline, { data: data })
    
    R.render(timelineElement, parent);
}

renderTimeline(timelineData, root);