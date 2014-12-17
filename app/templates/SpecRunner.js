require.config({
  baseUrl: "web",
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jquery: '../../<%= bowerDirectory %>/jquery/jquery',
    backbone: '../../<%= bowerDirectory %>/backbone-amd/backbone',
    underscore: '../../<%= bowerDirectory %>/underscore-amd/underscore',
    'jasmine': '../../<%= bowerDirectory %>/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html': '../../<%= bowerDirectory %>/jasmine/lib/jasmine-core/jasmine-html',
    'boot': '../../<%= bowerDirectory %>/jasmine/lib/jasmine-core/boot',
    spec: '../spec',
    view: '../../views',
    model: '../../models'
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
      }
  }
});

// Define all of your specs here. These are RequireJS modules.
var specs = [];

specs.push('spec/models/empty_spec')

// Load Jasmine - This will still create all of the normal Jasmine browser globals unless `boot.js` is re-written to use the
// AMD or UMD specs. `boot.js` will do a bunch of configuration and attach it's initializers to `window.onload()`. Because
// we are using RequireJS `window.onload()` has already been triggered so we have to manually call it again. This will
// initialize the HTML Reporter and execute the environment.
require(['boot'], function () {

  require(specs, function () {

      // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
      window.onload();
    });
});
