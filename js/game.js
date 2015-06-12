var Game = Backbone.Model.extend({

  initialize : function( gameData ){

    var self = this;

    if( gameData ){
      scaffold( gameData );
    } else {
    }

  },

  beginPlay : function(){
    this.trigger("game_output", "Welcome to Muh Surival!");
  },

  scaffold: function( gameData ){
  },

  handleInput: function( inputText ) {
    console.log( inputText );
  }
});
