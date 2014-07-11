'use strict';
//var util = require('util');
var yeoman = require('yeoman-generator');
var validDir = require('../helpers/validateDirectory');
var path       = require('path');

var TmplGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.templatesDirectory = this.config.get('templatesDirectory');
  },

  files: function () {
    var ext = 'html.twig';
    var templatesDirectory = validDir.getValidatedFolder(this.templatesDirectory);
    this.template('tmpl.js', path.join(templatesDirectory, this.name + '.' + ext));

  }
});

module.exports = TmplGenerator;
