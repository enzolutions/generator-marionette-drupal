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
        backform: {
          deps: ['backbone']
        },
        main: {
          deps: ['backbone.drupal.services', 'backform']
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
        /* backform */
        backform : '../<%= bowerDirectory %>/backform/src/backform',
        /* twig.js */
        twig: '../<%= bowerDirectory %>/twig.js/twig',
        /* alias the bootstrap js lib */
        bootstrap: '../<%= bowerDirectory %>/bootstrap-sass/dist/js/bootstrap',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        action: '../actions',
        form: '../forms',
        text: '../<%= bowerDirectory %>/requirejs-text/text',
        template: '../templates',
        view: '../views',
        model: '../models',
        collection: '../collections',
      },
    });
