const Grader = require('../../utils/leonardograder.js');
const compareJSON = require('./jsonCompare.js');
const fs = require('fs');

module.exports = function validateGraderOutput(solutionJSON, submissionJSON, scoringJSON, settingsJSON,expectedJSON) {
	try{
				var graderObject = new Grader.default();
				var solutionJSON1= JSON.parse(solutionJSON);
				var submissionJSON1= JSON.parse(submissionJSON);
				var scoringJSON1= JSON.parse(scoringJSON);
			    var settingsJSON1= JSON.parse(settingsJSON);
				var expectedJSON1= JSON.parse(expectedJSON);
				var expectedFinalScore=[];
				var expectedgotScore=[];
				var expectedID=[];
				var submissionID=[];
				var submissiongotScore=[];
				var submissionFinalScore=[];
				var validation,str;

/*var expected=expectedJSON1.scoredJson
for (var i = 0; i < expected.rules.length; i++) {
					   					 var counter = expected.rules[i];
					   					 console.log('For the ID '+counter.id+ ' Score is '+counter.score+' Got Score is ' + counter.gotScore + ' and status '+counter.status);
					 					
					 					expectedFinalScore[i]=counter.score;
					 					expectedgotScore[i]=counter.gotScore;
										expectedID[i]=counter.id;

									}*/
//Scorer Json Data fetch




						var output = graderObject.Grade(solutionJSON1, submissionJSON1, scoringJSON1, settingsJSON1);
						//var  ScorerJSON=JSON.stringify(output);
						var scoredJSONOutput = output.scoredJson
						var expectedJSON2=expectedJSON1.scoredJson

						var  expectedJSONOutput1=JSON.stringify(expectedJSON2);
						var  Expected=JSON.stringify(output);
						//Expected Data json fetch
					
					
						fs.writeFile("F:/Leonardo Paint/MOCHADEMO/output/Expected.json", Expected, (error) => { /* handle error */ });
						fs.writeFile("F:/Leonardo Paint/MOCHADEMO/output/expectedJSON1.json", expectedJSONOutput1, (error) => { /* handle error */ });
						
						      /*for (var i = 0; i < scoredJSONOutput.rules.length; i++) {
					   					 var counter = scoringJSON1.rules[i];
					   					 console.log('Scored Json For the ID '+counter.id+ ' Score is '+counter.score+' Got Score is ' + counter.gotScore + ' and status '+counter.status);
					   					console.log('Expected Json For the ID '+expectedID[i]+ ' Score is '+expectedFinalScore[i]+' Got Score is ' + expectedgotScore[i] );
					 					validation="";
					 					submissionFinalScore[i]=counter.score;
					 					submissiongotScore[i]=counter.gotScore;
										submissionID[i]=counter.id;

										//if (submissionID[i]==expectedID[i])
										//{
										
										if (submissiongotScore[i]==expectedgotScore[i])
										console.log("validation of "+submissionID[i] +" is Pass")
										else 
										{
											str = scoringJSON1.rules[i].rules[0].targetCell;
											str=JSON.stringify(str);
											console.log(str)

											validation=validation.concat(str);
											console.log(validation)
											console.log("validation of "+submissionID[i] +" is Fail")
											//scoringJSON1.rules[i].rules[0].targetCell)
											return validation
										}
											return validation
									    //}
							}*/
							
				  	var difference = compareJSON(scoredJSONOutput, expectedJSON2)
					fs.writeFile("F:/Leonardo Paint/MOCHADEMO/output/difference.json", difference, (error) => { /* handle error */ });
					console.log(difference)
					return difference
		}

												/*solutionJSON1= fs.readFileSync("F:/Leonardo Paint/MOCHADEMO/output.json")
												console.log(solutionJSON1)

												return solutionJSON1
										}*/
			catch(err){
           	console.log(err)
            logger.error("Grader function generate" +err)
           	 }
}
