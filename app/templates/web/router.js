define(
  ['backbone.marionette',
   'controller'
  ],
    function (Marionette, Controller) {
        'use strict';

        var Router = Marionette.AppRouter.extend({
            controller: Controller,
            initialize : function(options) {
              // store a App that will be used to show the stuff rendered by this components
              this.controller = new Controller({
                App: options.App
              });
            },
        });

        return Router;
      });
