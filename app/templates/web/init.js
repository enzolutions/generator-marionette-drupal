require.config({
    baseUrl: '/scripts',

    /* starting point for application */
    deps: ['backbone.marionette', 'main'],

    shim: {
        backbone: {
          deps: [
            'underscore',
            'jquery'
          ],
          exports: 'Backbone'
        },
        productionjs: {
          deps: ['jquery'],
        },
        'backbone.drupal': {
          deps: ['backbone']
        },
        'backbone.drupal.services': {
          deps: ['backbone.drupal']
        },
        'bootstrap2.3': {
            deps: ['backbone']
        },
        'bootstrap-datepicker': {
            deps: ['bootstrap2.3']
        },
        backform: {
          deps: [ 'bootstrap-datepicker']
        },
        main: {
          deps: ['backbone.drupal.services', 'productionjs', 'backform']
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
        'bootstrap2.3': '../vendor/backform/3rd/bootstrap2.3.min',
        'bootstrap-datepicker': '../<%= bowerDirectory %>/backform/3rd/bootstrap-datepicker',
        /* twig.js */
        twig: '../<%= bowerDirectory %>/twig.js/twig',
        /* modernizr */
        'modernizr': '../<%= bowerDirectory %>/modernizr/modernizr',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../<%= bowerDirectory %>/requirejs-text/text',
        template: '../templates',
        model: '../models',
        collection: '../collections',
        view: '../views',
        form: '../forms',
        action: '../actions',

        /* Production minified JS*/
        productionjs: '/js/dist/production.min'
      },
    });
