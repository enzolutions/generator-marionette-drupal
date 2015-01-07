define(["backbone"<% if (!_.isEmpty(backbone_model)) { %>, 'backbone.drupal'<% }%>], function(<%= _.classify('backbone') %> ) {

    <% if (!_.isEmpty(backbone_model)) { %>
      var <%= _.classify(Model) %> = Backbone.Drupal.Models.<%= _.classify(backbone_model) %>.extend({
    <% } else { %>
      var <%= _.classify(Model) %> = Backbone.Model.extend({
    <% } %>
      initialize: function(options) {
        console.log("initialize a <%= _.classify(Model) %> model");
        this.backform = options.backform;
        <% if (!_.isEmpty(modelEndPoint)) { %>
        this.url = "<%= modelEndPoint %>";
        <% } %>
      },

      defaults: {},
    });

    return <%= _.classify(Model) %>;

});
