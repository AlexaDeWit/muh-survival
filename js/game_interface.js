var GameInterface = Backbone.View.extend({

  initialize: function(){
    var self = this;
    this.inputBox = $("#inputBox").first();
    this.textOutput = $("#textOutput").first();

    //put game construction here
    $.ajax({
      beforeSend: function(xhr){
        if (xhr.overrideMimeType)
          {
            xhr.overrideMimeType("application/json");
          }
      },
      dataType: "json",
      url     : "./game_content.json",
      success : self.constructGame,
      context : self
    });

  },

  events: {
    "enter #inputBox" : this.getInput
  },

  constructGame: function( gameDataJSON ) {

    this.model = new Game( gameDataJSON );

    this.listenTo( this.model, "game_output", this.outputText );

    this.model.beginPlay();

  },

  formatOutput: function (outputString) {
    return "<li>" + outputString + "</li>";
  },

  outputText: function ( outputString ) {
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
