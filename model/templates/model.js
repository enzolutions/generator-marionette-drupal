define(["backbone"], function(<%= _.classify('backbone') %> ) {

    var <%= _.classify(name) %> = Backbone.Model.extend({
      initialize: function() {
        console.log("initialize a <%= _.classify(name) %> model");
      },

      defaults: {},
    });

    return <%= _.classify(name) %>;

});
