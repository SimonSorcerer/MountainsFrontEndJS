define(['react', 'data/countries', 'helpers/validator', 'helpers/form', 'vendor/pikaday'], function (R, countries, validator, formHelper, Pikaday) {

    
    return R.createClass({
        getInitialState: function() {
            return { 
                validName: true,
                errorMessage: ''
            };
        },
        closeForm: function () {
            this.props.toggleForm();
        },
        componentDidMount: function () {
            var dateInputElement =  R.findDOMNode(this.refs.form_date),
                picker;
            
            if (dateInputElement) {
                picker = new Pikaday({
                    field: dateInputElement,
                    firstDay: 1
                });
                
                picker.gotoToday();
            }
        },
        render: function () {
			var	nameElement = formHelper.createInput(this, 'form_name', 'Name', { isNotEmpty: 'Please enter mountain name!' }),
                heightElement = formHelper.createInput(this, 'form_height', 'Height', { isNotEmpty: 'Please enter mountain height!', isNumber: 'Mountain height must be a number!' }),
                countryElement = formHelper.createSelect(this, 'form_country', 'Country', countries),
                dateElement = formHelper.createInput(this, 'form_date', 'Date', { isNotEmpty: 'Please select date!' }),
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