var Player = Backbone.Model.extend({

  meetsItemRequirement : function( requirement ){ 
    var item;
    item = this.get( "inventory_items" ).get( requirement.item_id );
    return item &&  ( item.get( "count" ) >= requirement.item_count );
  }

});
