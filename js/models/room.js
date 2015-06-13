var Room = Backbone.Model.extend({

  findAction : function( actionWords ){
    return _.find( this.get( "possible_actions" ), function( possAct ){
      //Verb only
      if( possAct.hasOwnProperty( "verb" ) && !possAct.hasOwnProperty("noun") ){
        return _.contains( actionWords, possAct.verb );
      } else if( possAct.hasOwnProperty( "verb" ) && possAct.hasOwnProperty("noun") ){
        return _.contains( actionWords, possAct.verb ) &&
               _.contains( actionWords, possAct.noun );
      } else {
        return undefined;
      }
    });
  }
});
