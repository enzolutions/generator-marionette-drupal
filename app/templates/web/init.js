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
        },
        'backbone.drupal': {
          deps: ['backbone']
        },
        'backbone.drupal.services': {
          deps: ['backbone.drupal']
        },
        main: {
              deps: ['backbone.drupal.services']
        }
      },
      paths: {
        jquery: '../<%= bowerDirectory %>/jquery/jquery',
        backbone: '../<%= bowerDirectory %>/backbone-amd/backbone',
        underscore: '../<%= bowerDirectory %>/underscore-amd/underscore',

        /* alias all marionette libs */
        'backbone.marionette': '../<%= bowerDirectory %>/backbone.marionette/lib/core/backbone.marionette',
        'backbone.wreqr': '../<%= bowerDirectory %>/backbone.wreqr/lib/backbone.wreqr',
        'backbone.babysitter': '../<%= bowerDirectory %>/backbone.babysitter/lib/backbone.babysitter',
        /* backbone.drupal */
        'backbone.drupal': '../<%= bowerDirectory %>/backbone.drupal/backbone.drupal',
        'backbone.drupal.services': '../<%= bowerDirectory %>/backbone.drupal/backbone.drupal.services',

        /* twig.js */
        twig: '../<%= bowerDirectory %>/twig.js/twig',
        /* alias the bootstrap js lib */
        bootstrap: '../<%= bowerDirectory %>/bootstrap-sass/dist/js/bootstrap',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../<%= bowerDirectory %>/requirejs-text/text',
        tmpl: '../templates',
        action: '../actions',
      },
    });
