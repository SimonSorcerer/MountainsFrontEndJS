/// <reference path="../../typings/react/react.d.ts"/>
var root = document.body,
    R = React,
    DOM = R.DOM,
    timelineData = [
        { name: 'Gerlach', height: 2655 },
        { name: 'Mala Dumola', height: 470 },
        { name: 'Chopok', height: 2022 },
        { name: 'Mt. Blanc', height: 5417 },
        { name: 'Keprnik', height: 1344 }
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

components.timelineItem = R.createClass({
    render: function () {
        var text = this.props.name + ' (' + this.props.height + 'm)',
            className = getMountainCategory(this.props.height);

        return DOM.div({ className: className }, text);
    }
});

components.timeline = R.createClass({
    render: function () {
        var children = [];
        
        this.props.data.forEach(function (item) {
            children.push(R.createElement(components.timelineItem, item));
        });
        
        return DOM.div({ className: 'timeline' }, children);
    }
});

function renderTimeline(data, parent) {
    var timelineElement = R.createElement(components.timeline, { data: data })
    
    R.render(timelineElement, parent);
}

renderTimeline(timelineData, root);