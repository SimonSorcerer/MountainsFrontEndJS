define(['react', 'helpers/validator'], function (R, validator) {
	
    function wrapFormElement(options) {
        var labelElement = R.DOM.span({ className: 'formLabel', key: options.key + '_label' }, options.label),
            errorMessageElement = createErrorMessageElement(options.context, options.key);
        
        return R.DOM.div({ className: 'formLine', key: options.key + '_wrapper' }, [labelElement, options.element, errorMessageElement]);     
    }
    
    function getClassNameFromState(state) {
        var className = 'valid';
        
        if (typeof state !== 'undefined') {
            className = state ? 'valid' : 'invalid';
        }
        
        return className;
    }
    
    function validate(options) {
        var validationResult = validator.validate(options.validatorInstructions, options.value),
            validityKey = options.key + '_valid',
            errorMessageKey = options.key + '_error',
            newState = {};
            
        if (!validationResult.valid) {
            newState[validityKey] = false;
        } else {
            newState[validityKey] = true;
            newState[options.key] = options.value;
        }
        
        newState[errorMessageKey] = validationResult.messages.join(' ');
        options.context.setState(newState);
    }
    
    function createErrorMessageElement(context, key) {
        var errorMessageKey = key + '_error';
        
        return R.DOM.div({ className: 'formError', key: errorMessageKey }, context.state[errorMessageKey]);
    }
    
	function createInput(options) {
        var validityKey = options.key + '_valid',
            inputSettings = {
                className: getClassNameFromState(options.context.state[validityKey]),
                type: 'text',
                ref: options.key,
                key: options.key
            };
            
        if (options.reset) {
            inputSettings.value = '';
        }
            
        if (options.validatorInstructions) {
            inputSettings.onChange = function (event) {
                validate({
                    value: event.target.value,
                    context: options.context, 
                    key: options.key, 
                    validatorInstructions: options.validatorInstructions
                });
            }
        }
        
        return wrapFormElement({
            element: R.DOM.input(inputSettings), 
            context: options.context, 
            key: options.key, 
            label: options.label
        });    
    }
    
    function createSelectOptions(values, reset) {
        var children = [];
        
        Object.keys(values).forEach(function (key) {
            if (reset && children.length === 0) {
                children.push(R.DOM.option({ value: key, key: key, selected: true }, values[key]));
            } else {
                children.push(R.DOM.option({ value: key, key: key }, values[key]));
            }
        });
        
        return children;
    }
    
    function createSelect(options) {
        var selectSettings,
            validityKey = options.key + '_valid';
            
        selectSettings = {
            className: getClassNameFromState(options.context.state[validityKey]),
            ref: options.key,
            key: options.key
        };
        
        if (options.validatorInstructions) {
            selectSettings.onChange = function (event) {
                validate({
                    value: event.target.value, 
                    context: options.context, 
                    key: options.key, 
                    validatorInstructions: options.validatorInstructions
                });
            }
        }
            
        return wrapFormElement({
            element: R.DOM.select(selectSettings, createSelectOptions(options.selectValues, options.reset)), 
            context: options.context, 
            key: options.key, 
            label: options.label
        });    
    }
	
	return {
		createInput: createInput,
        createSelect: createSelect
	}
});