'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var validDir = require('../helpers/validateDirectory');
var listDir = require('../helpers/listDirectory');
var inquirer = require("inquirer");
var _ = require('underscore');
var _s = require('underscore.string');

module.exports = ViewGenerator;

function ViewGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.askFor = function () {
  var done = this.async();

  this.appDirectory = this.config.get('appDirectory');
  this.modelsDirectory = this.config.get('modelsDirectory');
  this.collectionsDirectory = this.config.get('collectionsDirectory');
  this.testDirectory = this.config.get('testDirectory');
  this.specs = this.config.get('specs');

  var modelsDir = validDir.getValidatedFolder(this.modelsDirectory);
  var models = listDir.getListFolder(modelsDir);

  var collectionsDir = validDir.getValidatedFolder(this.collectionsDirectory);
  var collections = listDir.getListFolder(collectionsDir);

  var modelCollection = [];

  models.forEach(function (model) {
    modelCollection.push({'name': 'Model: ' + model, 'value': 'model:' + model});
  }.bind(this));

  if (collections) {
    modelCollection.push(new inquirer.Separator());
    collections.forEach(function (collection) {
      modelCollection.push({'name': 'Collection: ' + collection, 'value': 'collection:' + collection});
    }.bind(this));
  }

  var prompts = [
    {
      type: 'string',
      name: 'viewName',
      message: 'What is the name for new view?',
    },
    {
      type: 'list',
      name: 'viewModelCollection',
      message: 'Choose what model/collection must be included in new view?',
      choices: modelCollection
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
    var viewModelCollection = props.viewModelCollection.split(':');
    this.ViewModel = '';
    this.ViewCollection = '';
    if (viewModelCollection[0] === 'model') {
      this.ViewModel = viewModelCollection[1];
    }
    else {
      this.ViewCollection = viewModelCollection[1];
    }

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
    this.testDirectoyName = _s.strRight(this.testDirectory, this.appDirectory + '/');
    this.viewsDirectoyName = _s.strRight(this.viewsDirectory, this.appDirectory + '/');
    this.template('test_view.' + ext, path.join(this.testDirectory + '/spec/' + this.viewsDirectoyName, this.View + '_spec.' + ext));
    this.specs.push('/' + this.testDirectoyName + '/spec/' + this.viewsDirectoyName + '/' + this.View + '_spec.js');
    this.config.set('specs', this.specs);

    // Set force overwrite template to avoid ask to end user
    this.conflicter.force = true;

    // Regenerate list of test unit for Jasmine integration
    this.template('../../app/templates/web/specs.js', this.testDirectory + '/specs.js');
  }

  this.template('view.' + ext, path.join(this.viewsDirectory, this.View + '.' + ext));

};
