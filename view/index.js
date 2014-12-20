'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var validDir = require('../helpers/validateDirectory');
var listDir = require('../helpers/listDirectory');

module.exports = ViewGenerator;

function ViewGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.askFor = function () {
  var done = this.async();

  this.modelsDirectory = this.config.get('modelsDirectory');

  var modelsDir = validDir.getValidatedFolder(this.modelsDirectory);
  var models = listDir.getListFolder(modelsDir);

  var prompts = [
    {
      type: 'string',
      name: 'viewName',
      message: 'What is the name for new view?',
    },
    {
      type: 'list',
      name: 'viewModel',
      message: 'Choose what model must be included in new view?',
      choices: models
    },
    { type: 'confirm',
      name: 'viewTemplate',
      message: 'Create a new template for view?',
    },
    { when: function (response) {
        return response.viewTemplate;
      },
      type: 'string',
      name: 'viewTemplateName',
      message: 'What is the name of new template?',
      default: function (response) {
        return response.viewName;
      }
    },
    { type: 'confirm',
      name: 'testUnit',
      message: 'Do you want to create an empty Test Unit for new view?',
      default: false
    },
  ];

  this.prompt(prompts, function (props) {
    this.View = props.viewName;
    this.ViewModel = props.viewModel;
    this.testUnit = props.testUnit;
    this.viewTemplate = props.viewTemplate;
    this.templateName = props.viewTemplateName;
    done();
  }.bind(this));
};

ViewGenerator.prototype.generateView = function () {
  var ext = 'js';

  this.appDirectory = this.config.get('appDirectory');
  this.viewsDirectory = this.config.get('viewsDirectory');

  if (this.viewTemplate) {
    this.invoke('marionette-drupal:template', {options: {templateName: this.templateName}});
  }

  if (this.testUnit) {
    // Crete test unit file
  }

  this.template('view.' + ext, path.join(this.viewsDirectory, this.View + '.' + ext));

};
