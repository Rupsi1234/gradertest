const Grader = require('../../utils/leonardograder.js');
const compareJSON = require('./jsonCompare.js');
const fs = require('fs');
module.exports = function validateMatcherOutput(solutionJSON, submissionJSON, settingsJSON,expectedJSON) {
	try{
			var graderObject = new Grader.default();
			var solutionJSON1= JSON.parse(solutionJSON);
			var submissionJSON1= JSON.parse(submissionJSON);
			var expectedJSON= JSON.parse(expectedJSON);
			var settingsJSON1= JSON.parse(settingsJSON);
			var matcherJSON = graderObject.GenerateMatcherOutput(solutionJSON1, submissionJSON1,settingsJSON1);
			var  matcherJSON1=JSON.stringify(matcherJSON);
			var expectedJSON = expectedJSON.matchedElementsJson
			var  expectedJSON1=JSON.stringify(expectedJSON);
			fs.writeFile("F:/Leonardo Paint/MOCHADEMO/output/expected.json", expectedJSON1, (error) => { /* handle error */ });
			fs.writeFile("F:/Leonardo Paint/MOCHADEMO/output/matcher.json", matcherJSON1, (error) => { /* handle error */ });

			var compare = compareJSON(matcherJSON, expectedJSON)
			console.log("matcher"+compare)
			fs.writeFile("F:/Leonardo Paint/MOCHADEMO/output/output2.json", compare, (error) => { /* handle error */ });
			return compare
	}
	catch(err){
          console.log(err)
          logger.error("Grader function generate" +err)
                 }


}
