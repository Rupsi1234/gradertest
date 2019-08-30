    var request = require("request");
    var assert = require('chai').assert;
    var data_driven = require('mocha-data-driven')
    //assert = require('assert'),
    argv1 = require('minimist')(process.argv.slice(1));
    var GVersion=argv1.global
    console.log("GraderVerion"+GVersion);

      const fs = require('fs');
      var validateMatcherOutput = require('../utils/custom-functions/validateMatcherOutput.js')
      var validateGraderOutput = require('../utils/custom-functions/validateGraderOutput.js')
      var solutionJSON, solutionJSON,expectedJSON,expectedJSON,expectedJSON

function test(result, done) {
    try {

      if (result.Assignment.includes("Input")) {	
			 solutionJSON = fs.readFileSync(result.Assignment+"/Solution.json")
       scoringJSON=fs.readFileSync(result.Assignment+"/Scoring.json")
       settingsJSON=fs.readFileSync(result.Assignment+"/settingsJSON.json")
      }

       if (result.Submission.includes("Submission")) {	
			  SubmissionJSON = fs.readFileSync(result.Submission+"/submission.json")
        expectedJSON=fs.readFileSync(result.Submission+"/Expected.json")
      }

         if (result.Function.includes("Matcher")) { 
        var compareOutput =validateMatcherOutput(solutionJSON, SubmissionJSON, expectedJSON)
        console.log("Compare Output Test"+compareOutput)
                if (compareOutput=="")
                done()
                else 
                done(new Error("Matcher is failed"));  
      }
      

          if (result.Function.includes("Grader")) { 
         var GraderOutput1 =validateGraderOutput(solutionJSON, SubmissionJSON, scoringJSON, settingsJSON,expectedJSON);    
         console.log("Grader Test Comparison"+JSON.stringify(GraderOutput1))
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
        var TCV1IDcheck;
         const config = require('config');

         GVersion1 = GVersion.toString().split(",");
         console.log(GVersion1)
        for (j=0;j<GVersion1.length;j++)

        { 
          console.log(j)
          GVersionName=GVersion1[j].toLowerCase();
         var graderversion = config.get(GVersionName);
     
         Object.keys(graderversion).forEach(function(Datakey) 
             {
              
             
                var jsonname = graderversion[Datakey].testcasePath;
               // var Gradercodefile = graderversion[Datakey].Graderversion;
                var TCV1ID=graderversion[Datakey].TCV1ID;
                ValidateArray = TCV1ID.toString().split(",");
                var rawdata = fs.readFileSync('./testdata/'+jsonname+'.json');
                const Grader = require('../utils/bundle.js');
                data = JSON.parse(rawdata);
console.log('first1')
                for (i=0;i<ValidateArray.length;i++)
                {
                     TCV1IDcheck=ValidateArray[i]
                   console.log(i)
                          data_driven([data], function() {     
                       
                          //Object.keys(data).forEach(function(Suitekey) {
                                  it('check the value Suite ', function(ctx) {
                                     
                                      console.log('sfsdfsdf'+ctx.Suite1.TC01 )
   console.log (ctx.Suite1.TC01.Priority)
                                  //this.timeout(99999999);
                                  var ty=[ctx.Suite1.TC01.Inputfiles];
                                  console.log(ty)
                              it('validate fopr', function(ty) {
                                       console.log (ty)
                                     //Object.keys(data[Suitekey]).forEach(function(testCaseKey) {
                                          if (testCaseKey==TCV1IDcheck){
                                               var TCID = testCaseKey;
                                                const inputData = data[Suitekey][testCaseKey].Inputfiles;
                                                var TC_NAME = data[Suitekey][testCaseKey].TestCase;
                                                var TC_Tags = data[Suitekey][testCaseKey].Priority;
                                                      it(TCV1IDcheck+'--'+TC_Tags, function(ctx,done) {
                                                        console.log(ctx.Name)
                                                          const files = inputData.length;
                                                           test(inputData[0], done,function()
                                                           {console.log("function end") });
                                                           // done();
                                                        })
                                                }


                                        })
                                         /*after(function(done) {
                                          console.log("End of Suite")
                                          done();
                                          });*/
                                       
                                 })

                           });
                 }  
            });
    }
     });