define(
  ['backbone.marionette', <% _.each(routes, function (route) { %>
          '!action/<%= route.action %>',
        <% }); %>
  ],
function (Marionette, <% _.each(routes, function (route) { %>
          <%= _.classify(route.action) %>
        <% }); %>)
  {
    'use strict';
    var Controller = Marionette.Controller.extend({
      initialize : function(options) {
        // store a regions that will be used to show the stuff rendered by this components
        this.App = options.App;
       },
      <% _.each(routes, function (route) { %>
       <%= route.action %>: function() {
        return <%= _.classify(route.action) %>(this.App);
        },
      <% }); %>
    });

    return Controller;
  });
