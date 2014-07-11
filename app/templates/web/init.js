require.config({
    baseUrl: '/scripts',

    /* starting point for application */
    deps: ['backbone.marionette', 'bootstrap', 'main'],

    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
              ],
              exports: 'Backbone'
            },
            bootstrap: {
              deps: ['jquery'],
              exports: 'jquery'
            }
          },
          paths: {
            jquery: '../<%= bowerDirectory %>/jquery/jquery',
            backbone: '../<%= bowerDirectory %>/backbone-amd/backbone',
            underscore: '../<%= bowerDirectory %>/underscore-amd/underscore',

            /* alias all marionette libs */
            'backbone.marionette': '../<%= bowerDirectory %>/backbone.marionette/lib/core/amd/backbone.marionette',
            'backbone.wreqr': '../<%= bowerDirectory %>/backbone.wreqr/lib/amd/backbone.wreqr',
            'backbone.babysitter': '../<%= bowerDirectory %>/backbone.babysitter/lib/amd/backbone.babysitter',
            /* backbone.drupal */
            'backbone.drupal': '../<%= bowerDirectory %>/backbone.drupal/backbone.drupal',
            'backbone.drupal.services': '../<%= bowerDirectory %>/backbone.drupal/backbone.drupal.services',

            /* twig.js */
            twig: '../<%= bowerDirectory %>/twig.js/twig',
            /* alias the bootstrap js lib */
            bootstrap: 'vendor/bootstrap',

            /* Alias text.js for template loading and shortcut the templates dir to tmpl */
            text: '../<%= bowerDirectory %>/requirejs-text/text',
            tmpl: '../<%= templatesDirectory %>',
          },
        });
