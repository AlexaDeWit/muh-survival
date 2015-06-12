var GameInterface = Backbone.View.extend({

  initialize: function(){
    var self = this;
    this.inputBox = $("#inputBox").first();
    this.textOutput = $("#textOutput").first();


    this.inputBox.keyup( function(e) {
      if( e.keyCode == 13 ) {
        self.getInput();
      }
    });

    this.model = new Game();

    this.listenTo( this.model, "game_output", this.outputText );
    
    this.model.beginPlay();

  },

  formatOutput: function (outputString) {
    return "<li>" + outputString + "</li>";
  },

  outputText: function ( outputString ) {
    console.log("output text");
    var domDestination = this.textOutput;
    domDestination.append( this.formatOutput( outputString ) );
    while ( domDestination[0].scrollHeight > domDestination[0].clientHeight ){
      domDestination.find(":first-child").remove();
    }
  },

  getInput: function(){
    var textEntered = this.inputBox.val();
    this.inputBox.val("");
    this.model.handleInput( textEntered );
  },

});
