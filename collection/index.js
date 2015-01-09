'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var validDir = require('../helpers/validateDirectory');
var listDir = require('../helpers/listDirectory');
var _ = require('underscore');
var _s = require('underscore.string');

module.exports = CollectionGenerator;

function CollectionGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(CollectionGenerator, yeoman.generators.NamedBase);

CollectionGenerator.prototype.askFor = function () {
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

  var prompts = [
    {
      type: 'string',
      name: 'collectionName',
      message: 'What is the name for new collection?',
      validate: function( value ){
        if(value.trim()){
          return true;
        }else{
          return  "Collection name can’t be empty";
        }
      },
    },
    {
      type: 'list',
      name: 'collectionModel',
      message: 'Choose what model must be included in new collection?',
      choices: models
    },
    { when: function () {
        return !_.isEmpty(collections);
      },
      type: 'confirm',
      name: 'collectionInherit',
      message: 'Collection inherit from other collection?',
      default: false
    },
    { when: function (response) {
        return response.collectionInherit;
      },
      type: 'list',
      name: 'collectionInheritName',
      message: 'What is the collection inherit?',
      choices: collections
    },
    {
      when: function (response) {
        return (!response.collectionInherit);
      },
      type: 'string',
      name: 'collectionEndPoint',
      message: 'Please provide the collection point relative to Drupal?',
      default: 'none'
    },
    { type: 'confirm',
      name: 'testUnit',
      message: 'Do you want to create an empty Test Unit for new collection?',
      default: false
    },
  ];

  this.prompt(prompts, function (props) {
    this.Collection = _s.underscored(_s.camelize(props.collectionName));
    this.collectionModel = props.collectionModel;
    this.testUnit = props.testUnit;
    this.collectionInheritName = props.collectionInheritName;
    this.collectionEndPoint = props.collectionEndPoint;
    done();
  }.bind(this));
};

CollectionGenerator.prototype.generateCollection = function () {
  var ext = 'js';

  if (this.testUnit) {
    // Crete test unit file
    this.testDirectoyName = _s.strRight(this.testDirectory, this.appDirectory + '/');
    this.collectionsDirectoryName = _s.strRight(this.collectionsDirectory, this.appDirectory + '/');
    this.template('test_collection.' + ext, path.join(this.testDirectory + '/spec/' + this.collectionsDirectoryName, this.Collection + '_spec.' + ext));
    this.specs.push('/' + this.testDirectoyName + '/spec/' + this.collectionsDirectoryName + '/' + this.Collection + '_spec.js');
    this.config.set('specs', this.specs);

    // Set force overwrite template to avoid ask to end user
    this.conflicter.force = true;

    // Regenerate list of test unit for Jasmine integration
    this.template('../../app/templates/web/specs.js', this.testDirectory + '/specs.js');
  }

  this.template('collections.' + ext, path.join(this.collectionsDirectory, this.Collection + '.' + ext));
};
