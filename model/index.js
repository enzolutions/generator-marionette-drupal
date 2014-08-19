'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var validDir = require('../helpers/validateDirectory');
var path       = require('path');

module.exports = ModelGenerator;

function ModelGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.option('drupal-node', { desc: 'Create a new empty model using Backbone Node definition' });
  this.option('drupal-user', { desc: 'Create a new empty model using Backbone User definition' });
  this.option('drupal-comment', { desc: 'Create a new empty model using Backbone Comment definition' });
  this.option('drupal-file', { desc: 'Create a new empty model using Backbone File definition' });

  // To DO figure out why argument 0 is not available as property

  this.name = this.arguments[0];

  // Set backbone model empty to avoid error if wasn't provided
  this.backbone_model = '';

  if (this.options['drupal-node']) {
    this.backbone_model = 'node';
  }

  if (this.options['drupal-user']) {
    this.backbone_model = 'user';
  }

  if (this.options['drupal-comment']) {
    this.backbone_model = 'comment';
  }

  if (this.options['drupal-file']) {
    this.backbone_model = 'file';
  }
}

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.init = function () {
  this.modelsDirectory = this.config.get('modelsDirectory');

};

ModelGenerator.prototype.files = function () {
    var ext = 'js';
    var modelsDir = validDir.getValidatedFolder(this.modelsDirectory);
    this.template('model.' + ext, path.join(modelsDir, this.name + '.' + ext));
  };
