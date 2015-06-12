window.GameInterface = {

  initialize: function(){
    GameInterface.inputBox = $("#inputBox").first();
    GameInterface.textOutput = $("#textOutput").first();
    _.extend( GameInterface, Backbone.Events );


    GameInterface.inputBox.keyup( function(e) {
      if( e.keyCode == 13 ) {
        GameInterface.getInput();
      }
    });

  },

  formatOutput: function (outputString) {
    return "<li>" + outputString + "</li>";
  },

  outputText: function ( outputString ) {
    var domDestination = GameInterface.textOutput;
    domDestination.append( GameInterface.formatOutput( outputString ) );
    while ( domDestination[0].scrollHeight > domDestination[0].clientHeight ){
      domDestination.find(":first-child").remove();
    }
  },

  getInput: function(){
    var textEntered = GameInterface.inputBox.val();
    GameInterface.inputBox.val("");
    Game.handleInput( textEntered );
  },

};
