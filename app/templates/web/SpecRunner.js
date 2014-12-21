require.config({
  baseUrl: "web",
  urlArgs: 'cb=' + Math.random(),
  /* starting point for application */
  deps: ['backbone.marionette', 'backbone.drupal.services'],
  paths: {
    jquery: '../../<%= bowerDirectory %>/jquery/jquery',
    backbone: '../../<%= bowerDirectory %>/backbone-amd/backbone',
    'backbone.wreqr': '../../<%= bowerDirectory %>//backbone.wreqr/lib/backbone.wreqr',
    'backbone.babysitter': '../../<%= bowerDirectory %>//backbone.babysitter/lib/backbone.babysitter',
    underscore: '../../<%= bowerDirectory %>/underscore-amd/underscore',
    /* alias all marionette libs */
    'backbone.marionette': '../../<%= bowerDirectory %>/backbone.marionette/lib/core/backbone.marionette',
    /* backbone.drupal */
    'backbone.drupal': '../../<%= bowerDirectory %>/backbone.drupal/backbone.drupal',
    'backbone.drupal.services': '../../<%= bowerDirectory %>/backbone.drupal/backbone.drupal.services',
    'jasmine': '../../<%= bowerDirectory %>/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html': '../../<%= bowerDirectory %>/jasmine/lib/jasmine-core/jasmine-html',
    'boot': '../../<%= bowerDirectory %>/jasmine/lib/jasmine-core/boot',
    /* twig.js */
    twig: '../../<%= bowerDirectory %>//twig.js/twig',
    text: '../../<%= bowerDirectory %>/requirejs-text/text',
    template: '../../templates',
    specs: '../specs',
    view: '../../views',
    model: '../../models',
    collection: '../../collections'
  },
  shim: {
    jasmine: {
        exports: 'jasmine'
    },
    'jasmine-html': {
        deps: ['jasmine'],
        exports: 'jasmine'
    },
    'boot': {
        deps: ['jasmine', 'jasmine-html'],
        exports: 'jasmine'
    },
    'backbone.drupal': {
      deps: ['backbone']
    },
    'backbone.drupal.services': {
      deps: ['backbone.drupal']
    },
  }
});

// Load Jasmine - This will still create all of the normal Jasmine browser globals unless `boot.js` is re-written to use the
// AMD or UMD specs. `boot.js` will do a bunch of configuration and attach it's initializers to `window.onload()`. Because
// we are using RequireJS `window.onload()` has already been triggered so we have to manually call it again. This will
// initialize the HTML Reporter and execute the environment.
require(['boot'], function () {
  // Load list of specs
  require(['specs'], function (specs) {
      // Load all specs defintion fo be process by jasmine
      require(specs, function () {
        // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
        window.onload();
      });
    });
});
