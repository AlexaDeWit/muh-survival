var GameInterface = Backbone.View.extend({

  discardedInputWords : [
    "to",
    "the"
  ],

  initialize: function(){
    var self = this;
    this.el = $( ".game_window" )[0];
    this.$el = $( this.el );
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

    this.delegateEvents();
  },

  events: {
    "keyup #inputBox" : "keyPressEventHandler"
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

  keyPressEventHandler : function( e ){
    //enter key
    if( e.keyCode == 13 ) {
      this.getInput();
    }
  },

  getInput: function(){
    var textEntered,
    cleanedWords,
    lowerCaseWords;

    textEntered = this.inputBox.val();

    //work in lower case for simple comparisons
    lowerCaseWords = textEntered.toLowerCase();
    //An array representing the user input.
    cleanedWords = this.cleanInput( lowerCaseWords );
    this.inputBox.val("");

    //Only send input to the game if it exists.
    if( cleanedWords.length > 0 && cleanedWords[0] !== "" ){
      this.model.handleInput( cleanedWords );
    }
  },

  cleanInput : function( text ){
    var strippedText,
    splitText,
    self;
    self = this;

    //Strip string to alphanumeric + whitespace
    strippedText = text.replace(/[^a-zA-Z\d\s:]/g, '' );
    //split string into a word array
    splitText = strippedText.split(/\s+/);
    //return a list of words, removing those explicitly discarded
    return _.reject( splitText, function( word ){
      return _.includes( self.discardedInputWords, word );
    });
  }

});
