  var data_driven = require('mocha-data-driven')
 function test1(a)
 {
  console.log( typeof a)
  describe('Graderasadf', function() {
    data_driven(a, function() {
              it('Identify the Test repositary Data', function(ctx1){
              console.log("check")
                console.log(ctx1)
                
               })

        })
  })
 }
  var fs =require('fs');
   var a;
  describe('Grader', function() {
	describe('Grader Test', function(){
		  var dataarray = fs.readFileSync('./config/Prod.json');
	    data = JSON.parse(dataarray);
      var Rupsi="Test"
   
            data_driven(data, function() {
                  it('Identify the version', function(ctx){
                     console.log("first"+ctx)
                    test1(ctx.Version1);
                        data_driven(ctx.Version1, function() {
                         it('Identify the version', function(ctx1){
                         console.log("second"+ctx1)

                          })
                        })
                      


                    })
              })   
          
          /*  data_driven([a], function() {
                   it('Identify the version', function(ctx1){
                     console.log("check")
                     console.log(ctx1)

                 })
              })*/
          
     
     
})
})


