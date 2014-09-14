define(
  ['backbone.marionette',
   'application', <% _.each(Action.views, function (view) { %>
          '!view/<%= view %>',
        <% }); %>
  ],
    function (Marionette, App, <% _.each(Action.views, function (view) { %>
          <%= _.classify(view) %>View
        <% }); %>) {
        'use strict';

        var <%= _.classify(Action.action) %> = function (App) {

            // Get region to render
            var region = App._regionManager.getRegion('<%= Action.region %>');

           // statements go here
           console.log("initialize a <%= _.classify(Action.action) %> Action");
           <% _.each(Action.views, function (view) { %>
             var <%= view %>View = new <%= _.classify(view) %>View({model: null});
             region.show(<%= view %>View);
           <% }); %>
        };

        return <%= _.classify(Action.action) %>;
      });
