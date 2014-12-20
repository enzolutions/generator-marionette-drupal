'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var validDir = require('../helpers/validateDirectory');

function TemplateGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.templatesDirectory = this.config.get('templatesDirectory');
}

util.inherits(TemplateGenerator, yeoman.generators.NamedBase);

TemplateGenerator.prototype.askFor = function () {
  var done = this.async();

  if (!this.options.templateName) {

    var prompts = [
      {
        type: 'string',
        name: 'templateName',
        message: 'What is the name for new template?',
      }
    ];

    this.prompt(prompts, function (props) {
      this.templateName = props.templateName;
      done();
    }.bind(this));
  }
  else {
    this.templateName = this.options.templateName;
    done();
  }
};

TemplateGenerator.prototype.generateTemplate = function () {
  var ext = 'html.twig';
  var templatesDirectory = validDir.getValidatedFolder(this.templatesDirectory);
  this.template('template.js', path.join(templatesDirectory, this.templateName + '.' + ext));
};

module.exports = TemplateGenerator;
