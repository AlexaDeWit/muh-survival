var Room = Backbone.Model.extend({

  findAction : function( actionWords ){
    return _.find( this.get( "possible_actions" ), function( possAct ){

      var isVerbMatched,
          isNounMatched;
      if( possAct.hasOwnProperty( "verbs" ) ){
        //Look for allowed verbs in user input
        isVerbMatched = _.foldl( possAct.verbs, function( isFound, verb ){
          return isFound || _.contains( actionWords, verb );
        }, false);

        //Noun and Verb required.
        if( possAct.hasOwnProperty( "nouns" ) ){
          //Look for allowed nouns in user input
          isNounMatched = _.foldl( possAct.nouns, function( isFound, noun ){
            return isFound || _.contains( actionWords, noun );
          }, false);

          return isVerbMatched && isNounMatched;
        //Verb only
        } else {
          return isVerbMatched;
        }
      } else {
        return undefined;
      }
    });
  }
});
