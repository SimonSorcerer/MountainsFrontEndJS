define(['react', 'data/countries', 'helpers/validator', 'helpers/form', 'repositories/mountainRepository', 'vendor/pikaday'], 
    function (R, countries, validator, formHelper, mountainRepository, Pikaday) {

    return R.createClass({
        getInitialState: function() {
            return {};
        },
        closeForm: function () {
            this.props.toggleForm();
        },
        submitForm: function () {
            var newMountain = {
                name: this.state.form_name,
                height: this.state.form_height,
                country: this.state.form_country,
                date: this.state.form_date
            };
            
            if (this.isFormValid()) {
                console.log(this.state);
                console.log(newMountain);
                
                /*
                mountainRepository.insert(newMountain, function (result) {
                    console.log("Mountain added: " + result.toString());
                });
                */
            }
        },
        isFormValid: function () {
            var formKeys = ['form_name', 'form_height', 'form_country', 'form_date'],
                state = this.state;
            
            return formKeys.every(function (key) {
                var validKey = key + '_valid';
                return state[validKey] !== false;
            });
        },
        componentDidMount: function () {
            var dateInputDOMElement = R.findDOMNode(this.refs.form_date),
                picker,
                state = this.state,
                options = {
                    field: dateInputDOMElement,
                    firstDay: 1,
                    onSelect: function (value) {
                        state.form_date = value.toJSON();
                        console.log(state.form_date);
                    }
                };
            
            if (dateInputDOMElement) {
                picker = new Pikaday(options);
                
                picker.gotoToday();
            }
        },
        render: function () {
			var	nameElement = formHelper.createInput(this, 'form_name', 'Name', { isNotEmpty: 'Please enter mountain name!' }),
                heightElement = formHelper.createInput(this, 'form_height', 'Height', { isNotEmpty: 'Please enter mountain height!', isNumber: 'Mountain height must be a number!' }),
                countryElement = formHelper.createSelect(this, 'form_country', 'Country', countries),
                dateElement = formHelper.createInput(this, 'form_date', 'Date'),
                confirmButtonElement = R.DOM.button({
                    key: 'confirmButton', 
                    className: 'confirm',
                    disabled: !this.isFormValid(),
                    onClick: this.submitForm
                }, 'Confirm'),
                cancelButtonElement = R.DOM.button({
                    key: 'cancelButton', 
                    className: 'cancel',
                    onClick: this.closeForm
                }, 'Cancel'),
                buttonHolderElement = R.DOM.div({ className: 'buttonHolder', key: 'buttonHolder' }, [cancelButtonElement, confirmButtonElement]),
                childElements = [nameElement, heightElement, countryElement, dateElement, buttonHolderElement],
                style = {
                    display: this.props.visible ? 'block' : 'none'
                };
             
			return R.DOM.div({ className: 'newItemContainer', style: style }, childElements);
		}
	});
});