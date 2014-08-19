define(["backbone"], function(<%= _.classify('backbone') %> ) {

    <% if (!_.isEmpty(backbone_model)) { %>
      var <%= _.classify(name) %> = Backbone.Drupal.Models.<%= _.classify(backbone_model) %>.extend({
    <% } else { %>
      var <%= _.classify(name) %> = Backbone.Model.extend({
    <% } %>
      initialize: function() {
        console.log("initialize a <%= _.classify(name) %> model");
      },

      defaults: {},
    });

    return <%= _.classify(name) %>;

});
