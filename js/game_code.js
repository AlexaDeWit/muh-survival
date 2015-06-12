$(document).ready( function(){
  //Game code goes here

  var inputBox = $("#inpputBox").first();
  var textOutput = $("#textOutput").first();
  
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
  textOutput.append( formatOutput("cool!") );
});

function formatOutput(outputString) {
  return "<li>" + outputString + "</li>";
};

