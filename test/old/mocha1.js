    var request = require("request");
    var assert = require('chai').assert;
    const config = require('config');
      var data_driven = require('mocha-data-driven')
    argv1 = require('minimist')(process.argv.slice(1));
    var GVersion=argv1.global
    console.log("GraderVerion"+GVersion);

      const fs = require('fs');
      var validateMatcherOutput = require('../utils/custom-functions/validateMatcherOutput.js')
      var validateGraderOutput = require('../utils/custom-functions/validateGraderOutput.js')
      var solutionJSON, solutionJSON,expectedJSON,expectedJSON,expectedJSON

function test(Assignment,Submission,Function1,done) {
    try {

    
	   solutionJSON = fs.readFileSync(Assignment+"/Solution.json")
       scoringJSON=fs.readFileSync(Assignment+"/Scoring.json")
       settingsJSON=fs.readFileSync(Assignment+"/settingsJSON.json")
       SubmissionJSON = fs.readFileSync(Submission+"/Submission.json")
       expectedJSON=fs.readFileSync(Submission+"/Expected.json")
      
        if (Function1.includes("Matcher")) { 
        var compareOutput =validateMatcherOutput(solutionJSON, SubmissionJSON, expectedJSON)
        //console.log("Compare Output Test"+compareOutput)
                if (compareOutput=="")
                done()
                else 
                done(new Error("Matcher is failed"));  
        }
      
         if (Function1.includes("Grader")) { 
         var GraderOutput1 =validateGraderOutput(solutionJSON, SubmissionJSON, scoringJSON, settingsJSON,expectedJSON);    
         //console.log("Grader Test Comparison"+JSON.stringify(GraderOutput1))
                if (GraderOutput1=="")
                done()
                else 
                done(new Error("Grader is failed"));
      }

    } 
    catch (err) {
        console.log(err);
    }

}        
    describe("Grader Test", function(client) {
      var TCvdi1;
         GVersion1 = GVersion.toString().split(",");
             for (j=0;j<GVersion1.length;j++)
             { 
              GVersionName=GVersion1[j].toLowerCase();
              var graderversion = config.get(GVersionName);
                        describe(GVersionName , function(done) { 
                        this.timeout(99999999);
                        Object.keys(graderversion).forEach(function(Datakey) 
                        {
                          var rawdata = fs.readFileSync('./testdata/'+graderversion[Datakey].testcasePath+'.json');

                              const Grader = require('../utils/bundle.js');
                              testCaseData = JSON.parse(rawdata);
                              var TestCaseArray = graderversion[Datakey].TCV1ID.toString().split(",");
                                            data_driven(testCaseData, function() {
                                                it('dssdf {TC}', function(ctx,done){
                                                    for (var i=0;i<TestCaseArray.length;i++)
                                                   {
                                                    TCvdi1=TestCaseArray[i];
                                                     if (ctx.TCID==TCvdi1){
                                                     console.log("Rupsi")
                                                              const Assignment = ctx.Assignment;
                                                              const Submission = ctx.Submission;
                                                              const Function1 = ctx.Function;
                                                              test(Assignment,Submission,Function1, done)
                                                              }

                                                         }
                                                      })
                                                })

                                            });
                                       
                           });
                   
                   }
      });