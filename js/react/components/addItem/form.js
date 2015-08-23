define(['react', 'data/countries', 'helpers/validator', 'helpers/form', 'repositories/mountainRepository', 'vendor/pikaday'], 
    function (R, countries, validator, formHelper, mountainRepository, Pikaday) {

    return R.createClass({
        getInitialState: function() {
            return {};
        },
        closeForm: function () {
            this.props.toggleForm();
        },
        clearForm: function () {
            // not implemented yet
        },
        submitForm: function () {
            var newMountain = {
                    name: this.state.form_name,
                    height: this.state.form_height,
                    country: this.state.form_country,
                    date: this.state.form_date
                };
            
            if (this.isFormValid()) {
                console.log(newMountain);
                
                mountainRepository.insert(newMountain, function (result) {
                    console.log("Mountain added: " + result.toString());
                });
            }
        },
        isFormValid: function () {
            var formKeys = ['form_name', 'form_height', 'form_country', 'form_date'],
                state = this.state;
            
            return formKeys.every(function (key) {
                var validityKey = key + '_valid';
                return state[validityKey] !== false;
            });
        },
        resetForm: function () {
             var formKeys = ['form_name', 'form_height', 'form_country', 'form_date'],
                newState = {};
                
            formKeys.forEach(function (key) {
                var validityKey = key + '_valid',
                    errorMessageKey = key + '_error';
                
                newState[validityKey] = true;
                newState[key] = '';
                newState[errorMessageKey] = '';
            });
            
            this.setState(newState);
        },
        componentWillReceiveProps: function (nextProps) {
           if (!nextProps.visible) {
               this.resetForm();
           }
        },
        componentDidMount: function () {
            var dateInputDOMElement = R.findDOMNode(this.refs.form_date),
                picker,
                context = this,
                options = {
                    field: dateInputDOMElement,
                    firstDay: 1,
                    onSelect: function (value) {
                        context.setState({form_date: value.toJSON()});
                    }
                };
            
            if (dateInputDOMElement) {
                picker = new Pikaday(options);
                picker.gotoToday();
            }
        },
        render: function () {
			var	nameElement = formHelper.createInput({
                    context: this, 
                    key: 'form_name', 
                    label: 'Name',
                    reset: !this.props.visible,
                    validatorInstructions: { isNotEmpty: 'Please enter mountain name!' }
                }),
                heightElement = formHelper.createInput({
                    context: this, 
                    key: 'form_height', 
                    label: 'Height', 
                    reset: !this.props.visible,
                    validatorInstructions: { isNotEmpty: 'Please enter mountain height!', isNumber: 'Mountain height must be a number!' }
                }),
                countryElement = formHelper.createSelect({
                    context: this, 
                    key: 'form_country', 
                    label: 'Country', 
                    reset: !this.props.visible,
                    selectValues: countries
                }),
                dateElement = formHelper.createInput({
                    context: this, 
                    key: 'form_date', 
                    label: 'Date',
                    reset: !this.props.visible
                }),
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