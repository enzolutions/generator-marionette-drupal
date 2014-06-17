'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var validDir = require('../helpers/validateDirectory');
var path       = require('path');

module.exports = ModelGenerator;

function ModelGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  //console.log(options);
  //this.option('with-template', { desc: 'Create a new empty template for this Model' });

  // To DO figure out why argument 0 is not available as property

  this.name = this.arguments[0];

  /*this.tmpl = this.options['with-template'];

  if (this.tmpl) {
    this.tmpl = this.name;
    this.hookFor('marionette-drupal', {
      as: 'tmpl',
      args: [this.tmpl]
    });
  }*/
}

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.init = function () {
  this.appDirectory = this.config.get('appDirectory');

};

ModelGenerator.prototype.files = function () {

    var ext = 'js';
    var baseDir = validDir.getValidatedFolder(this.appDirectory);
    this.template('model.' + ext, path.join(baseDir + '/models', this.name + '.' + ext));
  };
