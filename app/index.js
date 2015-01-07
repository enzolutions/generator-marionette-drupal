'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var validDir = require('../helpers/validateDirectory');
var _s = require('underscore.string');

var MarionetteDrupalGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.backendServer = this.config.get('backendServer');
    this.backendPort = this.config.get('backendPort');
    this.backendCORS = this.config.get('backendCORS');
    this.backendCORS = this.config.get('backendCORS');
    this.appDirectory = this.config.get('appDirectory');
    this.testDirectory = _s.strRight(this.config.get('testDirectory'), this.appDirectory + '/');
    this.bowerDirectory = _s.strRight(this.config.get('bowerDirectory'), this.appDirectory + '/');
    this.templatesDirectory = _s.strRight(this.config.get('templatesDirectory'), this.appDirectory + '/');
    this.modelsDirectory = _s.strRight(this.config.get('modelsDirectory'), this.appDirectory + '/');
    this.collectionsDirectory = _s.strRight(this.config.get('collectionsDirectory'), this.appDirectory + '/');
    this.viewsDirectory = _s.strRight(this.config.get('viewsDirectory'), this.appDirectory + '/');
    this.formsDirectory = _s.strRight(this.config.get('formsDirectory'), this.appDirectory + '/');
    this.actionsDirectory = _s.strRight(this.config.get('actionsDirectory'), this.appDirectory + '/');
    this.backendVersion = this.config.get('backendVersion');

    this.backendUser  = '';
    if(this.config.get('backendAuthToken')) {
      this.backendAuthToken = new Buffer(this.config.get('backendAuthToken'), 'base64').toString('ascii');
      this.backendUser = _s.strLeft(this.backendAuthToken, ':');
    }

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Marionette Drupal generator!'));

    this.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js, Backbone.Drupal, Marionette, Require and Modernizr.');

    var prompts = [{
      type: 'string',
      name: 'appDirectory',
      message: 'Where do you want the app installed?',
      default: this.appDirectory ? this.appDirectory : 'web'
    },
    { type: 'string',
      name: 'bowerDirectory',
      message: 'Where do you want the Bower components installed?',
      default: this.bowerDirectory ? this.bowerDirectory : 'vendor'
    },
    { type: 'string',
      name: 'templatesDirectory',
      message: 'Where do you want the templates be generated inside App Directory?',
      default: this.templatesDirectory ? this.templatesDirectory : 'templates'
    },
    { type: 'string',
      name: 'modelsDirectory',
      message: 'Where do you want the models be generated inside App Directory?',
      default: this.modelsDirectory ? this.modelsDirectory : 'models'
    },
    { type: 'string',
      name: 'collectionsDirectory',
      message: 'Where do you want the collections be generated inside App Directory?',
      default: this.collectionsDirectory ? this.collectionsDirectory : 'collections'
    },
    { type: 'string',
      name: 'viewsDirectory',
      message: 'Where do you want the views be generated inside App Directory?',
      default: this.viewsDirectory ? this.viewsDirectory : 'views'
    },
    { type: 'string',
      name: 'formsDirectory',
      message: 'Where do you want the forms be generated inside App Directory?',
      default: this.formsDirectory ? this.formsDirectory : 'forms'
    },
    { type: 'string',
      name: 'actionsDirectory',
      message: 'Where do you want the controller actions be generated inside App Directory?',
      default: this.actionsDirectory ? this.actionsDirectory : 'actions'
    },
    { type: 'string',
      name: 'testDirectory',
      message: 'Where do you want the test spec be generated inside App Directory?',
      default: this.testDirectory ? this.testDirectory :'test'
    },
    { type: 'confirm',
      name: 'backendVersion',
      message: 'Your Backend server is Drupal 8 ?',
      default: this.backendVersion
    },
    { type: 'string',
      name: 'backendServer',
      message: 'What is your Drupal Backend URL (include protocol)?',
      default: this.backendServer ? this.backendServer : 'http://example.com'
    },
    { type: 'string',
      name: 'backendPort',
      message: 'What is your Drupal Backend Port?',
      default: this.backendPort ? this.backendPort : '80'
    },
    { type: 'confirm',
      name: 'backendCORS',
      message: 'Enable Cross-origin resource sharing (CORS)?',
      default: this.backendCORS
    },
    { when: function (response) {
        return response.backendCORS;
      },
      type: 'string',
      name: 'backendUser',
      message: 'What is your Backend user?',
      default: this.backendUser ? this.backendUser : 'admin'
    },
    {when: function (response) {
        return response.backendCORS;
      },
      type: 'password',
      name: 'backendPassword',
      message: 'What is your Backend password?',
    }
    ];

    this.prompt(prompts, function (props) {
      this.appDirectory = props.appDirectory;
      this.bowerDirectory = props.bowerDirectory;
      this.templatesDirectory = props.templatesDirectory;
      this.modelsDirectory = props.modelsDirectory;
      this.viewsDirectory = props.viewsDirectory;
      this.formsDirectory = props.formsDirectory;
      this.collectionsDirectory = props.collectionsDirectory;
      this.actionsDirectory = props.actionsDirectory;
      this.testDirectory = props.testDirectory;
      this.backendVersion = props.backendVersion;
      this.backendServer = props.backendServer;
      this.backendPort = props.backendPort;
      this.backendCORS = props.backendCORS;
      this.backendUser = props.backendUser;
      this.backendPassword = props.backendPassword;

      var authToken = new Buffer(this.backendUser + ':' + this.backendPassword).toString('base64');
      this.config.set('appDirectory', this.appDirectory);
      this.config.set('bowerDirectory', this.bowerDirectory);
      this.config.set('templatesDirectory', this.appDirectory + '/' + this.templatesDirectory);
      this.config.set('modelsDirectory', this.appDirectory + '/' + this.modelsDirectory);
      this.config.set('backendServer', this.backendServer);
      this.config.set('backendAuthToken', authToken);
      this.config.set('backendPort', this.backendPort);
      this.config.set('backendCORS', this.backendCORS);
      this.config.set('collectionsDirectory', this.appDirectory + '/' + this.collectionsDirectory);
      this.config.set('viewsDirectory', this.appDirectory + '/' + this.viewsDirectory);
      this.config.set('formsDirectory', this.appDirectory + '/' + this.formsDirectory);
      this.config.set('actionsDirectory', this.appDirectory + '/' + this.actionsDirectory);
      this.config.set('testDirectory', this.appDirectory + '/' + this.testDirectory);

      done();
    }.bind(this));
  },

  git: function () {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  bower: function bower() {
    this.template('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
  },

  jshint: function jshint() {
    this.copy('jshintrc', '.jshintrc');
  },

  editorConfig: function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
  },

  gruntfile: function gruntfile() {
    this.template('Gruntfile.js');
  },

  jasmine: function jasmine() {
    this.template('web/_jasmine_index.html', this.appDirectory + '/' + this.testDirectory + '/index.html');
    this.template('web/SpecRunner.js', this.appDirectory + '/' + this.testDirectory + '/SpecRunner.js');

    // Store specs test units
    this.specs = ['/' + this.testDirectory + '/spec/models/empty_spec.js',
                  '/' + this.testDirectory + '/spec/views/home_spec.js'];

    this.config.set('specs', this.specs);



    this.template('web/specs.js', this.appDirectory + '/' + this.testDirectory + '/specs.js');

  },

  packageJSON: function packageJSON() {
    this.template('_package.json', 'package.json');
  },

  mailStylesheet: function mainStylesheet() {
    this.write(this.appDirectory + '/styles/sass/main.scss', '@import \'bootstrap-sass-official/assets/stylesheets/_bootstrap\';\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 400px;\n}');
  },

  app: function () {
    var ext = 'js';

    // App templates
    this.mkdir(this.appDirectory + '/' + this.templatesDirectory);
    this.copy('web/home.html.twig', this.appDirectory + '/' + this.templatesDirectory + '/home.html.twig');
    //App Main HTML
    this.template('web/index.html', this.appDirectory + '/index.html');

    // App JS
    this.mkdir(this.appDirectory + '/scripts');
    this.template('web/init.js', this.appDirectory + '/scripts/init.js');
    this.copy('web/main.js', this.appDirectory + '/scripts/main.js');
    this.copy('web/regionManager.js', this.appDirectory + '/scripts/regionManager.js');
    this.template('web/application.js', this.appDirectory + '/scripts/application.js');
    this.copy('web/communicator.js', this.appDirectory + '/scripts/communicator.js');
    this.copy('web/router.js', this.appDirectory + '/scripts/router.js');

    // Marionette JS Structure
    this.mkdir(this.appDirectory + '/' + this.viewsDirectory);
    this.mkdir(this.appDirectory + '/' + this.formsDirectory);
    this.mkdir(this.appDirectory + '/' + this.modelsDirectory);
    this.mkdir(this.appDirectory + '/' + this.collectionsDirectory);
    this.mkdir(this.appDirectory + '/' + this.actionsDirectory);
    this.mkdir(this.appDirectory + '/' + this.testDirectory);

    // Jasmine Test unit folders
    this.mkdir(this.appDirectory + '/' + this.testDirectory + '/spec/models');
    this.mkdir(this.appDirectory + '/' + this.testDirectory + '/spec/collections');
    this.mkdir(this.appDirectory + '/' + this.testDirectory + '/spec/templates');
    this.mkdir(this.appDirectory + '/' + this.testDirectory + '/spec/views');

    var emptyModel = 'empty';

    var baseDir = validDir.getValidatedFolder(this.appDirectory);
    baseDir = validDir.getValidatedFolder(this.appDirectory);

    // Generate default models
    this.template('../../model/templates/model.' + ext, path.join(baseDir + '/' + this.modelsDirectory, emptyModel + '.' + ext), {'Model': emptyModel, 'backbone_model': '', 'modelEndPoint': ''});
    this.template('../../model/templates/model.' + ext, path.join(baseDir + '/' + this.modelsDirectory, 'node' + '.' + ext), {'Model': emptyModel, 'backbone_model': 'Node', 'modelEndPoint': ''});
    this.template('../../model/templates/model.' + ext, path.join(baseDir + '/' + this.modelsDirectory, 'user' + '.' + ext), {'Model': emptyModel, 'backbone_model': 'User', 'modelEndPoint': ''});
    this.template('../../model/templates/model.' + ext, path.join(baseDir + '/' + this.modelsDirectory, 'comment' + '.' + ext), {'Model': emptyModel, 'backbone_model': 'Comment', 'modelEndPoint': ''});
    this.template('../../model/templates/model.' + ext, path.join(baseDir + '/' + this.modelsDirectory, 'file' + '.' + ext), {'Model': emptyModel, 'backbone_model': 'File', 'modelEndPoint': ''});

    this.template('../../model/templates/test_model.' + ext, path.join(baseDir + '/' + this.testDirectory + '/spec/' + this.modelsDirectory, emptyModel + '_spec.' + ext), {'Model': emptyModel, 'backbone_model': ''});

    // Set Models
    this.models = [{name: emptyModel, type: 'none'},
                   {name: 'node', type: 'node'},
                   {name: 'user', type: 'user'},
                   {name: 'comment', type: 'comment'},
                   {name: 'file', type: 'file'},
                  ];

    this.config.set('models', this.models);

    // App Views
    this.mkdir(this.appDirectory + '/views');
    var mainView = 'home';
    this.template('../../view/templates/view.' + ext, path.join(baseDir + '/views', mainView + '.' + ext), {'View': mainView, 'templateName': 'home', 'ViewModel': emptyModel, 'ViewCollection': ''});
    this.template('../../view/templates/test_view.' + ext, path.join(baseDir + '/' + this.testDirectory + '/spec/' + this.viewsDirectory, mainView + '_spec.' + ext), {'View': mainView});

    // Set MVC
    this.config.set('MVC', [{type: 'view', model: emptyModel, view: mainView}]);

    // App others
    this.mkdir(this.appDirectory + '/styles');
    this.mkdir(this.appDirectory + '/styles/sass');
    this.mkdir(this.appDirectory + '/styles/fonts');

    this.mkdir(this.appDirectory + '/images');
    this.template('web/404.html');
    this.template('web/favicon.ico');
    this.template('web/robots.txt');
    this.copy('web/htaccess', this.appDirectory + '/.htaccess');

    // Store actions controllers with his route
    this.routes = [
      {Route: '', Action: 'home', 'region': 'contentRegion', 'view': 'home'}
    ];
    this.config.set('actions', this.routes);

    // Store regions
    this.regions = [
      {name: 'mainMenuRegion', id: '#main-menu-region'},
      {name: 'contentRegion', id: '#content-region'},
      {name: 'footerRegion', id: '#footer-region'},
      {name: 'messages', id: '#messages'}
    ];
    this.config.set('regions', this.regions);

    // Generate regions for application
    this.template('../../region/templates/regions.js', this.appDirectory + '/scripts/regions.js');

    // Generate home controller action witout model to skip the fetch process
    this.Action = {'Action': 'home', 'View': 'home', 'Region': 'contentRegion'};
    this.template('../../action/templates/action.' + ext, path.join(baseDir + '/' + this.actionsDirectory, this.Action.Action + '.' + ext));

    // Generate controller for application
    this.template('web/controller.js', this.appDirectory + '/scripts/controller.js');

    // Generate routes for application
    this.template('web/routes.js', this.appDirectory + '/scripts/routes.js');
  },

});

module.exports = MarionetteDrupalGenerator;
