window.Game = {

  initialize: function(){
    Game.inputBox = $("#inpputBox").first();
    Game.textOutput = $("#textOutput").first();
  },

  formatOutput: function (outputString) {
    return "<li>" + outputString + "</li>";
  },

  outputText: function ( outputString ) {
    var domDestination = Game.textOutput;
    domDestination.append( Game.formatOutput( outputString ) );
    while ( domDestination[0].scrollHeight > domDestination[0].clientHeight ){
      domDestination.find(":first-child").remove();
    }
  }
};
