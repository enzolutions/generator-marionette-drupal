'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var validDir = require('../helpers/validateDirectory');
var listDir = require('../helpers/listDirectory');
var inquirer = require('inquirer');
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
  this.models = this.config.get('models');
  this.collectionsDirectory = this.config.get('collectionsDirectory');
  this.viewsDirectory = this.config.get('viewsDirectory');
  this.templatesDirectory = this.config.get('templatesDirectory');
  this.testDirectory = this.config.get('testDirectory');
  this.specs = this.config.get('specs');
  this.MVC = this.config.get('MVC');



  this.conflictView = null;

  var modelsDir = validDir.getValidatedFolder(this.modelsDirectory);
  var models = listDir.getListFolder(modelsDir);

  var collectionsDir = validDir.getValidatedFolder(this.collectionsDirectory);
  var collections = listDir.getListFolder(collectionsDir);

  var viewsDir = validDir.getValidatedFolder(this.viewsDirectory);
  this.views = listDir.getListFolder(viewsDir);

  var templatesDir = validDir.getValidatedFolder(this.templatesDirectory);
  var templates = listDir.getListFolder(templatesDir, -10);

  var modelCollection = [{'name': 'None', 'value': 'none'}];

  models.forEach(function (model) {
    modelCollection.push({'name': 'Model: ' + model, 'value': 'model:' + model});
  }.bind(this));

  if (!_.isEmpty(collections)) {
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
      validate: function( value ){
        if(value.trim()){
          return true;
        }else{
          return  "View name can’t be empty";
        }
      },
    },
    {
      type: 'list',
      name: 'viewModelCollection',
      message: 'Choose what model/collection must be included in new view?',
      choices: modelCollection
    },
    { type: 'confirm',
      name: 'viewTemplateNew',
      message: 'Create a new template for view?',
    },
    { when: function (response) {
        return response.viewTemplateNew;
      },
      type: 'string',
      name: 'viewTemplateName',
      message: 'What is the name of new template?',
      default: function (response) {
        return response.viewName;
      }
    },
    { when: function (response) {
        return !response.viewTemplateNew;
      },
      type: 'list',
      name: 'viewTemplateName',
      message: 'Choose template must be included in new view?',
      choices: templates
    },
    { type: 'confirm',
      name: 'testUnit',
      message: 'Do you want to create an empty Test Unit for new view?',
      default: false
    },
  ];

  this.prompt(prompts, function (props) {

    this.views.forEach(function (view) {
      if (view === _s.underscored(_s.camelize(props.viewName))) {
        this.conflictView = view;
        return true;
      }
    }.bind(this));

    if (this.conflictView) {
      console.log('Your request cannot be process because has conflicts with the following view');
      console.log('View: ', this.conflictView);
      process.exit();
    }
    else {
      var viewModelCollection = props.viewModelCollection.split(':');
      this.ViewModel = '';
      this.ViewCollection = '';

      if (viewModelCollection[0] === 'model') {
        this.ViewModel = viewModelCollection[1];
        this.templateType = 'model';

        this.model = _.findWhere(this.models, {name: this.ViewModel});
        this.drupalType = this.model.type;
      } else if (viewModelCollection[0] === 'collection') {
        this.ViewCollection = viewModelCollection[1];
        this.templateType = 'collection';
      } else {
        this.templateType = 'none';
      }

      this.View = _s.underscored(_s.camelize(props.viewName));

      //Set MVC
      this.MVC.push({type: 'view', model: this.ViewModel, collection: this.ViewCollection, view: this.View});
      this.config.set('MVC', this.MVC);

      // Set Unit  TEst
      this.testUnit = props.testUnit;

      // Set Template
      this.viewTemplateNew = _s.underscored(_s.camelize(props.viewTemplateNew));
      this.templateName = _s.underscored(_s.camelize(props.viewTemplateName));
    }

    done();
  }.bind(this));
};

ViewGenerator.prototype.generateView = function () {
  var ext = 'js';

  if (this.viewTemplateNew) {
    this.invoke('marionette-drupal:template', {options: {templateName: this.templateName, templateType: this.templateType, drupalType: this.drupalType}});
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
