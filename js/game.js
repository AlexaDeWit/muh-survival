var Game = Backbone.Model.extend({

  initialize : function( gameData ){

    var self = this;

    if( gameData ){
      this.scaffold( gameData );
      console.log( gameData );
    } else {
      console.log( "Game data missing, gg no re." );
    }

  },

  beginPlay : function(){
    this.trigger("game_output", this.get("welcome_message"));
  },

  scaffold: function( gameData ){
    this.set( gameData.game );
  },

  handleInput: function( inputText ) {
    console.log( inputText );
  }
});
