define(['react', 'data/countries'], function (R, countries) {
    function createLabeledInput(label, inputOptions) {
        var inputElement = R.DOM.input(inputOptions),
            labelElement = R.DOM.span({ className: 'formLabel', key: label }, label);
            
        return R.DOM.div({ className: 'formLine' }, [labelElement, inputElement]);    
    }
    
    function createSelectElement(elementOptions) {
        var children = [];
        
        Object.keys(countries).forEach(function (code) {
            children.push(R.DOM.option({ value: code, key: code }, countries[code]));
        });
        
        return R.DOM.select(elementOptions, children);
    }
    
    function createLabeledSelect(label, selectOptions) {
        var selectElement = createSelectElement(selectOptions),
            labelElement = R.DOM.span({ className: 'formLabel' }, label);
            
        return R.DOM.div({ className: 'formLine' }, [labelElement, selectElement]);
    }
    
    return R.createClass({
        closeForm: function() {
            console.log('Canceling');
            this.forceUpdate();
            this.props.toggleForm();
        },
        render: function () {
			var	nameElement = createLabeledInput('Name'),
                heightElement = createLabeledInput('Height'),
                countryElement = createLabeledSelect('Country'),
                dateElement = createLabeledInput('Date', { type: 'date' }),
                confirmButtonElement = R.DOM.button({ className: 'confirm' }, 'Confirm'),
                cancelButtonElement = R.DOM.button({ 
                    className: 'cancel',
                    onClick: this.closeForm
                }, 'Cancel'),
                buttonHolderElement = R.DOM.div({ className: 'buttonHolder' }, [cancelButtonElement, confirmButtonElement]),
                childElements = [nameElement, heightElement, countryElement, dateElement, buttonHolderElement],
                style = {
                    display: this.props.visible ? 'block' : 'none'
                };
                
            console.log('rendering form as ' + style.display);
				
			return R.DOM.div({ className: 'newItemContainer', style: style, key: 'newMountainForm' }, childElements);
		}
	});
});