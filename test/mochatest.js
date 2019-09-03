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



 
      
function testGrade(Assignment,Submission,functionName,TC_NAME,done) {
    if (functionName.includes("Matcher")) { 
     try {
           solutionJSON = fs.readFileSync(Assignment+"/Solution.json");
           submissionJSON = fs.readFileSync(Submission+"/Submission.json");
           expectedJSON=fs.readFileSync(Submission+"/Expected.json");
           settingsJSON=fs.readFileSync(Assignment+"/settingsJSON.json");
               var compareOutput =validateMatcherOutput(solutionJSON, submissionJSON, settingsJSON,expectedJSON,)
                  if (compareoutput=="")
                  done()
                  else 
                  done(new error(compareoutput));  
            }
             catch (err) {
              if (err.code === 'ENOENT') {
              done(new Error('File not found!'));
              }else {
                throw err;}
             }
       }
       else{  
         
       if (functionName.includes("Grader")) { 
        try{
           solutionJSON = fs.readFileSync(Assignment+"/Solution.json")
           scoringJSON=fs.readFileSync(Assignment+"/Scoring.json")
           settingsJSON=fs.readFileSync(Assignment+"/settingsJSON.json")
           submissionJSON = fs.readFileSync(Submission+"/Submission.json")
           expectedJSON=fs.readFileSync(Submission+"/Expected.json")
             var graderOutput1 =validateGraderOutput(solutionJSON, submissionJSON, scoringJSON, settingsJSON,expectedJSON);    
                    if (graderOutput1==""){
                    done()}
                    else {
                    done(new Error("Scoring are not matched for " +graderOutput1));}
                                 
                   }  catch (err) {
                        if (err.code === 'ENOENT') {
                     	       		done(new Error('File not found!'));
                     	       		 } else {
                     	       		   throw err;}
                   }
           }
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
                                                                      testGrade(Assignment,Submission,Function1,TC_NAME,done,function()
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
