define(function () {
	function classConcat() {
        var args = Array.prototype.slice.call(arguments);
        
        return args.join(' ');
    }
	
	return {
		classConcat: classConcat
	}
});