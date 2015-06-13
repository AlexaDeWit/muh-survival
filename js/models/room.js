var Room = Backbone.Model.extend({

  findAction : function( actionWords ){
    return _.find( this.get( "possible_actions" ), function( possAct ){
      console.log( possAct);
      var isVerbMatched,
          isNounMatched;
      if( possAct.hasOwnProperty( "verbs" ) ){
        //Look for allowed verbs in user input
        isVerbMatched = _.foldl( possAct.verbs, function( verb, isFound ){
          return isFound || _.contains( actionWords, verb );
        }, false);

        console.log( isVerbMatched );
        //Noun and Verb required.
        if( possAct.hasOwnProperty( "nouns" ) ){
          //Look for allowed nouns in user input
          isNounMatched = _.foldl( possAct.nouns, function( noun, isFound ){
            return isFound || _.contains( actionWords, noun );
          }, false);

          console.log( isNounMatched );
          return isVerbMatched && isNounMatched;
        //Verb only
        } else {
          return true;
        }
      } else {
        return undefined;
      }
    });
  }
});
