'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var validDir = require('../helpers/validateDirectory');
var path       = require('path');

module.exports = ViewGenerator;

function ViewGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.option('with-template', { desc: 'Create a new empty template for this view' });

  // To DO figure out why argument 0 is not available as property

  this.name = this.arguments[0];

  this.tmpl = this.options['with-template'];

  if (this.tmpl) {
    // Set tmpl variable to use template function
    this.tmpl = this.name;
    this.hookFor('marionette-drupal', {
      as: 'tmpl',
      args: [this.tmpl]
    });
  }
}

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.init = function () {
  this.appDirectory = this.config.get('appDirectory');
  this.viewsDirectory = this.config.get('viewsDirectory');
};

ViewGenerator.prototype.files = function () {

    var ext = 'js';
    var baseDir = validDir.getValidatedFolder(this.appDirectory);
    this.template('view.' + ext, path.join(baseDir + '/' + this.viewsDirectory, this.name + '.' + ext));
  };
