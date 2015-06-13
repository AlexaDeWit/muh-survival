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
    this.set( "player", new Player({
      inventory_items : new InventoryItems( gameData.starting_items )
    }) );
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
    var self,
        unmetRequirements;
    self = this;

    if( action.hasOwnProperty("requirements") ) {
      unmetRequirements = _.reject( action.requirements, function( requirement ){
        return self.checkActionRequirement( requirement );
      });
    }
    if( unmetRequirements && unmetRequirements.length > 0 ) {
      self.trigger( "game_output", _.first( unmetRequirements ).unmetMessage );
    } else {
      if( action.type === "room_change" ){
        this.enterRoom( this.get("rooms").get( action.dest_room_id ));
      }
    }
  },

  //returns true if requirement is met.
  checkActionRequirement : function( requirement ){
    if( requirement.type === "item" ) {
      return this.get("player").meetsItemRequirement( requirement );
    } else {
      return true;
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
