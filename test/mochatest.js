      var request = require("request");
      var assert = require('chai').assert;
      const winston = require('../Log.js');
      process.env.NODE_ENV = "TestRepositary";
      process.env.NODE_CONFIG_DIR = './itemMaster'
      const config = require('config');
      argv1 = require('minimist')(process.argv.slice(1));
      var GVersion=argv1.global
      console.log("GraderVerion"+GVersion);
      const fs = require('fs');
      var validateMatcherOutput = require('../utils/custom-functions/validateMatcherOutput.js')
      var validateGraderOutput = require('../utils/custom-functions/validateGraderOutput.js')
      var solutionJSON, solutionJSON,expectedJSON,expectedJSON,expectedJSON


function test(Assignment,Submission,Function1,TC_NAME,done) {
    try {
 
      
        if (Function1.includes("Matcher")) { 
           solutionJSON = fs.readFileSync(Assignment+"/Solution.json")
           SubmissionJSON = fs.readFileSync(Submission+"/submission.json")
           expectedJSON=fs.readFileSync(Submission+"/Expected.json")
           settingsJSON=fs.readFileSync(Assignment+"/settingsJSON.json")
                  var compareOutput =validateMatcherOutput(solutionJSON, SubmissionJSON, settingsJSON,expectedJSON,)
                          if (compareOutput=="")
                          done()
                          else 
                          done(new Error(compareOutput));  
            }
      
         if (Function1.includes("Grader")) { 
               solutionJSON = fs.readFileSync(Assignment+"/Solution.json")
               scoringJSON=fs.readFileSync(Assignment+"/Scoring.json")
               settingsJSON=fs.readFileSync(Assignment+"/settingsJSON.json")
               SubmissionJSON = fs.readFileSync(Submission+"/submission.json")
               expectedJSON=fs.readFileSync(Submission+"/Expected.json")
                         var GraderOutput1 =validateGraderOutput(solutionJSON, SubmissionJSON, scoringJSON, settingsJSON,expectedJSON);    
                                 
                                  if (GraderOutput1==""){
                                 
                                  done()}
                                else {
                              
                                
                                done(new Error("Scoring are not matched for " +GraderOutput1));}
                           
                         }

    } 
    catch (err) {
        console.log(err);

    }

}        
    describe("Grader Test", function() {
      try{
         GVersion1 = GVersion.toString().split(",");
             for (j=0;j<GVersion1.length;j++)
             { 
              GVersionName=GVersion1[j];
              //.toLowerCase();
              var graderversion = config.get(GVersionName);
                        describe(GVersionName+" Testcase " , function() { 
                        this.timeout(99999999);
                        Object.keys(graderversion).forEach(function(Datakey) 
                        {
                          var rawdata = fs.readFileSync('./testdata/'+graderversion[Datakey].testcasePath+'.json');
                            describe(graderversion[Datakey].testcasePath , function(client) { 
                              //const Grader = require('../utils/bundle.js');
                              testCaseData = JSON.parse(rawdata);
                              TestCaseArray = graderversion[Datakey].TCV1ID.toString().split(",");
                                      for (i=0;i<TestCaseArray.length;i++)
                                      {
                                           testCaseData.forEach(function(testCaseKey) {
                                                        if (testCaseKey.TCID==TestCaseArray[i]){
                                                               var TCID = testCaseKey;
                                                               var TC_NAME = testCaseKey.TestCase;
                                                               var TC_Tags = testCaseKey.Tags;
                                                               const Assignment = testCaseKey.Assignment;
                                                               const Submission = testCaseKey.Submission;
                                                               const Function1 = testCaseKey.Function;
                                                                it(TestCaseArray[i]+':'+TC_NAME+'--'+TC_Tags, function(done) {
                                                                      test(Assignment,Submission,Function1,TC_NAME,done,function()
                                                                       {console.log( TC_NAME +" end") });
                                                                 })
                                                           }

                                                               after(function(done) {
                                                                //console.log("End of Suite")
                                                                done();
                                                                });
                                                       

                                            });
                                       }  
                                  }); 
                           });
                        })
                   }
                   }
       catch(err)
       { console.log(err)
                    logger.error(GVersion1+" is not available in Item repositary")
        }

      });
