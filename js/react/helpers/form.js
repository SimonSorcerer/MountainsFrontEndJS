define(['react', 'helpers/validator'], function (R, validator) {
	
    function wrapFormElement(wrappedElement, key, label) {
        var labelElement = R.DOM.span({ className: 'formLabel', key: key }, label);
        
        return R.DOM.div({ className: 'formLine' }, [labelElement, wrappedElement]);     
    }
    
    function validate(value, context, key, validatorInstructions) {
        var validationResult = validator.validate(validatorInstructions, value),
            validityKey = key + 'valid',
            errorMessageKey = key + 'error',
            newState = {};
                        
        if (!validationResult.valid) {
            newState[validityKey] = false;
            newState[errorMessageKey] = validationResult.messages.join(', ');
            context.setState(newState);
        } else {
            newState[validityKey] = true;
            newState[key] = value;
            context.setState(newState);
        }
    }
    
	function createInput(context, key, label, validatorInstructions) {
        var inputElement,
            validityKey = key + 'valid';
        
            inputElement = R.DOM.input({
                className: context.state[validityKey] ? 'valid' : 'invalid',
                onChange: function (event) {
                    validate(event.target.value, context, key, validatorInstructions)
                } 
            });
        
        return wrapFormElement(inputElement, key, label);    
    }
    
    function createSelectOptions(values) {
        var children = [];
        
        Object.keys(values).forEach(function (key) {
            children.push(R.DOM.option({ value: key, key: key }, values[key]));
        });
        
        return children;
    }
    
    function createSelect(context, key, label, selectValues, validatorInstructions) {
        var selectElement,
            validityKey = key + 'valid';
        
            selectElement = R.DOM.select({
                className: context.state[validityKey] ? 'valid' : 'invalid',
                onChange: function (event) {
                    validate(event.target.value, context, key, validatorInstructions)
                } 
            }, createSelectOptions(selectValues));
        
        return wrapFormElement(selectElement, key, label);    
    }
	
	return {
		createInput: createInput,
        createSelect: createSelect
	}
});