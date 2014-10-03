define(
  ['backbone.marionette'
   <% _.each(Action.views, function (view) { %>,'!view/<%= view %>'<% }); %>
  ],
    function (Marionette <% _.each(Action.views, function (view) { %>
          ,<%= _.classify(view) %>View<% }); %>) {
        'use strict';

        var <%= _.classify(Action.action) %> = function (App) {
          // Get region to render
          <% _.each(Action.regions, function (region) { %>
            var region = App._regionManager.getRegion('<%= region %>');

           // statements go here
           console.log("initialize a <%= _.classify(Action.action) %> Action");
           <% _.each(Action.views, function (view) { %>
             var <%= _.underscored(view) %>View = new <%= _.classify(view) %>View({model: null});
             region.show(<%= _.underscored(view) %>View);
           <% }); %>
         <% }); %>
        };

        return <%= _.classify(Action.action) %>;
      });
