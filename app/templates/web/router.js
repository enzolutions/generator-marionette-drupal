define(
  ['backbone.marionette',
   'controller'
  ],
    function (Marionette, Controller) {
        'use strict';

        var AppRouter = Marionette.AppRouter.extend({
          controller: Controller
        });

        var Router = new AppRouter();
        <% _.each(routes, function(router) { %>
        Router.appRoute('<%= router.route %>', '<%= router.action %>');
        <% }); %>
        return Router;
      });
