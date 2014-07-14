'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var validDir = require('../helpers/validateDirectory');
var path       = require('path');

module.exports = ViewGenerator;

function ViewGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('model', { type: String, required: false, desc: 'Create a new empty model for this collection' });
  this.argument('inherit', { type: String, required: false, desc: 'Inherit from other collection' });

  // To DO figure out why argument 0 is not available as property
  this.name = this.arguments[0];

  //console.log(this);
  //this.tmpl = this.options['with-template'];

  if (this.model) {
    // Set tmpl variable to use template function
    //this.tmpl = this.name;
    this.hookFor('marionette-drupal', {
      as: 'model',
      args: [this.model]
    });
  }
}

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.init = function () {
  this.collectionsDirectory = this.config.get('collectionsDirectory');
};

ViewGenerator.prototype.files = function () {

    var ext = 'js';
    var collectionsDir = validDir.getValidatedFolder(this.collectionsDirectory);
    this.template('collections.' + ext, path.join(collectionsDir, this.name + '.' + ext));
  };
