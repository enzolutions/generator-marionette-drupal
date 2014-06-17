'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var validDir = require('../helpers/validateDirectory');
var path       = require('path');

var TmplGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.appDirectory = this.config.get('appDirectory');
  },

  files: function () {
    var ext = 'html.twig';
    var baseDir = validDir.getValidatedFolder(this.appDirectory);
    this.template('tmpl.js', path.join(baseDir + '/templates', this.name + '.' + ext));

  }
});

module.exports = TmplGenerator;
