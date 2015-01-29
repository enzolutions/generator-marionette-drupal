'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var validDir = require('../helpers/validateDirectory');
var listDir = require('../helpers/listDirectory');
var _s = require('underscore.string');

module.exports = ModelGenerator;

function ModelGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.askFor = function () {
  var done = this.async();

  this.appDirectory = this.config.get('appDirectory');
  this.modelsDirectory = this.config.get('modelsDirectory');
  this.testDirectory = this.config.get('testDirectory');
  this.specs = this.config.get('specs');

  this.modelDrupalTypes = ['Comment', 'File', 'Node', 'User', 'None'];

  this.models = this.config.get('models');

  this.conflictModel = null;
  this.Model = null;
  this.backbone_model = '';

  var prompts = [
    {
      type: 'string',
      name: 'modelName',
      message: 'What is the name for new model?',
      validate: function( value ){
        if(value.trim()){
          return true;
        }else{
          return  "Model name can’t be empty";
        }
      },
    },
    {
      type: 'list',
      name: 'drupalType',
      message: 'Do you what to use a Drupal Type?',
      choices: this.modelDrupalTypes,
      default: 'None'
    },
    {
      when: function (response) {
        return (response.drupalType === 'None');
      },
      type: 'string',
      name: 'modelEndPoint',
      message: 'Please provide the custom model end point (enter to not define)?',
      default: 'none'
    },

    { type: 'confirm',
      name: 'testUnit',
      message: 'Do you want to create an empty Test Unit for new model?',
      default: false
    },
  ];

  this.prompt(prompts, function (props) {
    this.models.forEach(function (model) {
      if (model.name === _s.underscored(_s.camelize(props.modelName))) {
        this.conflictModel = model.name;
        return true;
      }
    }.bind(this));

    if (this.conflictModel) {
      console.log('Your request cannot be process because has conflicts with the following model');
      console.log('Model: ', this.conflictModel);
      process.exit();
    }
    else {
      this.appDirectory = this.config.get('appDirectory');
      this.Model = _s.underscored(_s.camelize(props.modelName));
      this.models.push({name: this.Model, type: props.drupalType.toLowerCase()});
      this.config.set('models', this.models);

      if (props.drupalType !== 'None') {
        this.backbone_model = props.drupalType.toLowerCase();
        this.modelEndPoint = '';
      }
      else {
        this.modelEndPoint = props.modelEndPoint;
      }

      this.testUnit = props.testUnit;
      console.log('Model was added sucessfully');
    }

    done();
  }.bind(this));
};


ModelGenerator.prototype.generateModels = function () {
    var ext = 'js';

    // Create model
    var modelsDir = validDir.getValidatedFolder(this.modelsDirectory);
    this.template('model.' + ext, path.join(modelsDir, this.Model + '.' + ext));

    if (this.testUnit) {
      // Crete test unit file
      this.testDirectoyName = _s.strRight(this.testDirectory, this.appDirectory + '/');
      this.modelDirectoyName = _s.strRight(this.modelsDirectory, this.appDirectory + '/');
      this.template('test_model.' + ext, path.join(this.testDirectory + '/spec/' + this.modelDirectoyName, this.Model + '_spec.' + ext));
      this.specs.push('/' + this.testDirectoyName + '/spec/' + this.modelDirectoyName + '/' + this.Model + '_spec.js');
      this.config.set('specs', this.specs);

      // Set force overwrite template to avoid ask to end user
      this.conflicter.force = true;

      // Regenerate list of test unit for Jasmine integration
      this.template('../../app/templates/web/specs.js', this.testDirectory + '/specs.js');
    }
  };
