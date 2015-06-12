$(document).ready( function(){
  //Game code goes here

  var inputBox = $("#inpputBox").first();
  var textOutput = $("#textOutput").first();
  
  outputText( "Welcome to Muh Survival!", textOutput );

});

function formatOutput(outputString) {
  return "<li>" + outputString + "</li>";
};

function outputText( outputString, domDestination ) {
  domDestination.append( formatOutput( outputString ) );
  while ( domDestination[0].scrollHeight > domDestination[0].clientHeight ){
    domDestination.find(":first-child").remove();
  }
};
