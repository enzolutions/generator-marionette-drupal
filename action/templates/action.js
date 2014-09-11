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

        var <%= _.classify(name) %> = function () {
           // statements go here
           console.log("initialize a <%= _.classify(name) %> Action");
           <% _.each(views, function (view) { %>
             var <%= view %>View = new <%= _.classify(view) %>View({model: null});
             App.<%= region %>.show(<%= view %>View);
           <% }); %>
        };

        return <%= _.classify(name) %>;
      });
