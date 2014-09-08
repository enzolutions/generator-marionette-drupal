define(
  ['backbone.marionette', <% _.each(routes, function (router) { %>
          '!action/<%= router.action %>',
        <% }); %>
  ],
function (Marionette, <% _.each(routes, function (router) { %>
          <%= _.classify(router.action) %>
        <% }); %>)
  {
    'use strict';
    var Controller = Marionette.Controller.extend({
      <% _.each(routes, function (router) { %>
       <%= router.action %>: <%= _.classify(router.action) %>,
      <% }); %>
    });

    return new Controller();
  });
