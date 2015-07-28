define(function () {
	var validators = {
		isNotEmpty: isNotEmptyValidator,
		isNumber: isNumberValidator,
		isDate: isDateValidator
	};
	
	function isNotEmptyValidator(value) {
		return !!value;
	}
	
	function isNumberValidator(value) {
		var re = /^\d+$/;
		
		return value.search(re) > -1;
	}
	
	function isDateValidator(value) {
		// not implemented yet
		return true;
	}
	
	function validate(instructions, value) {
		var valid = true,
			messages = [];
		
		Object.keys(instructions).forEach(function (key) {
			var validator = validators[key],
				message = instructions[key],
				partialValid;
				
			partialValid = validator(value);
			if (!partialValid) {
				messages.push(message);
			}
			
			valid = valid && partialValid;
		});
		
		return {
			valid: valid,
			messages: messages
		};
	}
	
	return {
		validate: validate,
	}
});