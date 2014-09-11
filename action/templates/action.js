define(
  ['backbone.marionette',
   'application', <% _.each(views, function (view) { %>
          '!view/<%= view %>',
        <% }); %>
  ],
    function (Marionette, App, <% _.each(views, function (view) { %>
          <%= _.classify(view) %>View
        <% }); %>) {
        'use strict';

        var <%= _.classify(name) %> = function (App) {

            // Get region to render
            var region = App._regionManager.getRegion('<%= region %>');

           // statements go here
           console.log("initialize a <%= _.classify(name) %> Action");
           <% _.each(views, function (view) { %>
             var <%= view %>View = new <%= _.classify(view) %>View({model: null});
             region.show(<%= view %>View);
           <% }); %>
        };

        return <%= _.classify(name) %>;
      });
