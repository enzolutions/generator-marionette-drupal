define(
  ['backbone.marionette', <% _.each(routes, function (route) { %>
          '!action/<%= route.Action %>',<% }); %>
  ],
function (Marionette<% _.each(routes, function (route) { %>,<%= _.classify(route.Action) %><% }); %>)
  {
    'use strict';
    var Controller = Marionette.Controller.extend({
      initialize : function(options) {
        // store a regions that will be used to show the stuff rendered by this components
        this.App = options.App;
       },
      <% _.each(routes, function (route) { %>
       <%= route.Action %>: function() {
        return <%= _.classify(route.Action) %>(this.App);
        },
      <% }); %>
    });

    return Controller;
  });
