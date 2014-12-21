'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var inquirer = require("inquirer");

module.exports = ServerGenerator;

function ServerGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(ServerGenerator, yeoman.generators.NamedBase);

ServerGenerator.prototype.askFor = function () {
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

  if(this.config.get('backendAuthToken')) {
    this.backendAuthToken = new Buffer(this.config.get('backendAuthToken'), 'base64').toString('ascii');
    this.backendUser = _s.strLeft(this.backendAuthToken, ':');
  }
  var prompts = [
    {
      type: 'rawlist',
      name: 'settingsOptions',
      message: 'What setting do you want to update?',
      choices: [
        'App Directory',
        'Bower Directory',
        new inquirer.Separator(),
        'Templates Directory',
        'Models Directory',
        'Collections Directory',
        'Views Directory',
        'Forms Directory',
        'Actions Directory',
        'Test Directory',
        new inquirer.Separator(),
        'Drupal Backend URL',
        'Drupal Backend Port',
        'Drupal CORS',
        'Drupal Backend User',
        'Drupal Backend Pass'
      ]
    },
    { when: function (response) {
        return response.settingsOptions === 'App Directory';
      },
      type: 'string',
      name: 'appDirectory',
      message: 'Where do you want the app installed?',
      default: this.appDirectory ? this.appDirectory : 'web'
    },
    { when: function (response) {
        return response.settingsOptions === 'Bower Directory';
      },
      type: 'string',
      name: 'bowerDirectory',
      message: 'Where do you want the Bower components installed?',
      default: this.bowerDirectory ? this.bowerDirectory : 'vendor'
    },
    { when: function (response) {
        return response.settingsOptions === 'Templates Directory';
      },
      type: 'string',
      name: 'templatesDirectory',
      message: 'Where do you want the templates be generated inside App Directory?',
      default: this.templatesDirectory ? this.templatesDirectory : 'templates'
    },
    { when: function (response) {
        return response.settingsOptions === 'Models Directory';
      },
      type: 'string',
      name: 'modelsDirectory',
      message: 'Where do you want the models be generated inside App Directory?',
      default: this.modelsDirectory ? this.modelsDirectory : 'models'
    },
    { when: function (response) {
        return response.settingsOptions === 'Collections Directory';
      },
      type: 'string',
      name: 'collectionsDirectory',
      message: 'Where do you want the collections be generated inside App Directory?',
      default: this.collectionsDirectory ? this.collectionsDirectory : 'collections'
    },
    { when: function (response) {
        return response.settingsOptions === 'Views Directory';
      },
      type: 'string',
      name: 'viewsDirectory',
      message: 'Where do you want the views be generated inside App Directory?',
      default: this.viewsDirectory ? this.viewsDirectory : 'views'
    },
    { when: function (response) {
        return response.settingsOptions === 'Forms Directory';
      },
      type: 'string',
      name: 'formsDirectory',
      message: 'Where do you want the forms be generated inside App Directory?',
      default: this.formsDirectory ? this.formsDirectory : 'forms'
    },
    { when: function (response) {
        return response.settingsOptions === 'Actions Directory';
      },
      type: 'string',
      name: 'actionsDirectory',
      message: 'Where do you want the controller actions be generated inside App Directory?',
      default: this.actionsDirectory ? this.actionsDirectory : 'actions'
    },
    { when: function (response) {
        return response.settingsOptions === 'Test Directory';
      },
      type: 'string',
      name: 'testDirectory',
      message: 'Where do you want the test spec be generated inside App Directory?',
      default: this.testDirectory ? this.testDirectory :'test'
    },
    { when: function (response) {
        return response.settingsOptions === 'Drupal Backend URL';
      },
      type: 'string',
      name: 'backendServer',
      message: 'What is your Drupal Backend URL (include protocol)?',
      default: this.backendServer ? this.backendServer : 'http://example.com'
    },
    { when: function (response) {
        return response.settingsOptions === 'Drupal Backend Port';
      },
      type: 'string',
      name: 'backendPort',
      message: 'What is your Drupal Backend Port?',
      default: this.backendPort ? this.backendPort : '80'
    },
    { when: function (response) {
        return response.settingsOptions === 'Drupal CORS';
      },
      type: 'confirm',
      name: 'backendCORS',
      message: 'Enable Cross-origin resource sharing (CORS)?',
      default: this.backendCORS
    },
    { when: function (response) {
        return response.settingsOptions === 'Drupal Backend User';
      },
      type: 'string',
      name: 'backendUser',
      message: 'What is your Backend user?',
      default: this.backendUser ? this.backendUser : 'admin'
    },
    { when: function (response) {
        return response.settingsOptions === 'Drupal Backend Pass';
      },
      type: 'password',
      name: 'backendPassword',
      message: 'What is your Backend password?',
    }
  ];

  this.prompt(prompts, function (props) {

    if (props.settingsOptions === 'App Directory') {
      this.appDirectory = props.appDirectory;
      this.config.set('appDirectory', this.appDirectory);
    }

    if (props.settingsOptions === 'Bower Directory') {
      this.bowerDirectory = props.bowerDirectory;
      this.config.set('bowerDirectory', this.bowerDirectory);
    }

    if (props.settingsOptions === 'Templates Directory') {
      this.templatesDirectory = props.templatesDirectory;
      this.config.set('templatesDirectory', this.appDirectory + '/' + this.templatesDirectory);
    }

    if (props.settingsOptions === 'Models Directory') {
      this.modelsDirectory = props.modelsDirectory;
      this.config.set('modelsDirectory', this.appDirectory + '/' + this.modelsDirectory);
    }

    if (props.settingsOptions === 'Collections Directory') {
      this.collectionsDirectory = props.collectionsDirectory;
      this.config.set('collectionsDirectory', this.appDirectory + '/' + this.collectionsDirectory);
    }

    if (props.settingsOptions === 'Views Directory') {
      this.viewsDirectory = props.viewsDirectory;
      this.config.set('viewsDirectory', this.appDirectory + '/' + this.viewsDirectory);
    }

    if (props.settingsOptions === 'Forms Directory') {
      this.formsDirectory = props.formsDirectory;
      this.config.set('formsDirectory', this.appDirectory + '/' + this.formsDirectory);
    }

    if (props.settingsOptions === 'Actions Directory') {
      this.actionsDirectory = props.actionsDirectory;
      this.config.set('actionsDirectory', this.appDirectory + '/' + this.actionsDirectory);
    }

    if (props.settingsOptions === 'Test Directory') {
      this.testDirectory = props.testDirectory;
      this.config.set('testDirectory', this.appDirectory + '/' + this.testDirectory);
    }

    if (props.settingsOptions === 'Drupal Backend URL') {
      this.backendServer = props.backendServer;
      this.config.set('backendServer', this.backendServer);
    }

    if (props.settingsOptions === 'Drupal Backend Port') {
      this.backendPort = props.backendPort;
      this.config.set('backendPort', this.backendPort);
    }

    if (props.settingsOptions === 'Drupal CORS') {
      this.backendCORS = props.backendCORS;
      this.config.set('backendCORS', this.backendCORS);
    }

    var updateAuthToken = false;
    if (props.settingsOptions === 'Drupal Backend User') {
      this.backendUser = props.backendUser;
      updateAuthToken = true;
    }

    if (props.settingsOptions === 'Drupal Backend Pass') {
      this.backendPassword = props.backendPassword;
      updateAuthToken = true;
    }

    if (updateAuthToken) {
      var authToken = new Buffer(this.backendUser + ':' + this.backendPassword).toString('base64');
      this.config.set('backendAuthToken', authToken);
    }

    console.log('Setting for ' + props.settingsOptions + ' was updated successfully');

    done();
  }.bind(this));
};
