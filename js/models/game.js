var Game = Backbone.Model.extend({

  initialize : function( gameData, gameSaveData ){

    var self = this;
    this.saveData = gameSaveData || null;

    if( gameData ){
      this.scaffold( gameData );
    } else {
      console.log( "Game data missing, gg no re." );
    }

  },

  beginPlay : function(){
    this.trigger("game_output", this.get("welcome_message"));

    if( this.saveData ){
      this.loadSaveData();
    } else {
      this.enterRoom( this.get("rooms").get( "starting_room" ) );
    }
  },

  scaffold: function( gameData ){
    this.set( gameData.game_info );
    this.set( "rooms", new Rooms( gameData.rooms ) );
  },

  handleInput: function( inputWords ) {
    var foundAction;
    foundAction = this.currentRoom.findAction( inputWords );
    if( foundAction ){
      this.attemptAction( foundAction );
    } else {
      this.trigger( "game_output", "I don't understand that action." );
    }
  },

  attemptAction : function( action ){
    if( action.type === "room_change" ){
      this.enterRoom( this.get("rooms").get( action.dest_room_id ));
    }
  },

  enterRoom : function( room ){
    this.trigger("game_output", room.get("entry_text") );
    this.currentRoom = room;
  },

  loadSaveData : function(){
      this.enterRoom( this.get("rooms").get( this.saveData.currentRoom ) );
  }
});
