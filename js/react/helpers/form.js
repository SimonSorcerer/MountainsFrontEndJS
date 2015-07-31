define(['react', 'helpers/validator'], function (R, validator) {
	
    function wrapFormElement(wrappedElement, context, key, label) {
        var labelElement = R.DOM.span({ className: 'formLabel', key: key + '_label' }, label),
            errorMessageElement = createErrorMessageElement(context, key);
        
        return R.DOM.div({ className: 'formLine', key: key + '_wrapper' }, [labelElement, wrappedElement, errorMessageElement]);     
    }
    
    function getClassNameFromState(state) {
        var className = 'valid';
        
        if (typeof state !== 'undefined') {
            className = state ? 'valid' : 'invalid';
        }
        
        return className;
    }
    
    function validate(value, context, key, validatorInstructions) {
        var validationResult = validator.validate(validatorInstructions, value),
            validityKey = key + '_valid',
            errorMessageKey = key + '_error',
            newState = {};
                        
        if (!validationResult.valid) {
            newState[validityKey] = false;
        } else {
            newState[validityKey] = true;
            newState[key] = value;
        }
        
        newState[errorMessageKey] = validationResult.messages.join(' ');
        context.setState(newState);
    }
    
    function createErrorMessageElement(context, key) {
        var errorMessageKey = key + '_error';
        
        return R.DOM.div({ className: 'formError', key: errorMessageKey }, context.state[errorMessageKey]);
    }
    
	function createInput(context, key, label, validatorInstructions) {
        var inputElement,
            validityKey = key + '_valid';
        
            inputElement = R.DOM.input({
                className: getClassNameFromState(context.state[validityKey]),
                type: 'text',
                ref: key,
                key: key,
                onChange: function (event) {
                    validate(event.target.value, context, key, validatorInstructions)
                } 
            });
        
        return wrapFormElement(inputElement, context, key, label);    
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
            validityKey = key + '_valid';
            
            selectElement = R.DOM.select({
                className: getClassNameFromState(context.state[validityKey]),
                ref: key,
                key: key,
                onChange: function (event) {
                    validate(event.target.value, context, key, validatorInstructions)
                }
            }, createSelectOptions(selectValues));
        
        return wrapFormElement(selectElement, context, key, label);    
    }
	
	return {
		createInput: createInput,
        createSelect: createSelect
	}
});