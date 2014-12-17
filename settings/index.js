'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');

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
  this.appDirectory = this.config.get('appDirectory');
  this.testDirectory = _s.strRight(this.config.get('testDirectory'), this.appDirectory + '/');

  var prompts = [
    { type: 'string',
      name: 'backendServer',
      message: 'What is your Drupal Backend URL (include protocol)?',
      default: this.backendServer
    },
    { type: 'string',
      name: 'backendPort',
      message: 'What is your Drupal Backend Port?',
      default: this.backendPort
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

    this.backendServer = props.backendServer;
    this.backendPort = props.backendPort;
    this.backendCORS = props.backendCORS;
    this.backendUser = props.backendUser;
    this.backendPassword = props.backendPassword;

    var authToken = new Buffer(this.backendUser + ':' + this.backendPassword).toString('base64');
    this.config.set('backendServer', this.backendServer);
    this.config.set('backendPort', this.backendPort);
    this.config.set('backendCORS', this.backendCORS);
    this.config.set('backendAuthToken', authToken);

    console.log('Backend server information was updated successfully');

    done();
  }.bind(this));
};
