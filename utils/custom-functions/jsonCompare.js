var diff = require('deep-diff').diff;
const fs = require('fs');


module.exports = function compareJSON(lhs, rhs) {
	var differences = diff(lhs, rhs,function(path, key) {
    return key === 'feedback' || key === 'id' ;})

	if(differences == undefined) {
		return false;

	} else {

		var test_json = JSON.stringify(differences);
	
		return test_json;
	}

}
 
