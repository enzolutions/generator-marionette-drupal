'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var validDir = require('../helpers/validateDirectory');
var _ = require('underscore');
var _s = require('underscore.string');

function TemplateGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.templatesDirectory = this.config.get('templatesDirectory');
  this.structureType = ['Model', 'Collection', 'None'];
  this.modelDrupalTypes = ['Comment', 'File', 'Node', 'User', 'None']
  this.templateType = 'none';
  this.drupalType = 'none';

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
        validate: function( value ){
          if(value.trim()){
            return true;
          }else{
            return  "Template name can’t be empty";
          }
        },
      },
      {
        type: 'list',
        name: 'structureType',
        message: 'What type of Structure will be render in template?',
        choices: this.structureType,
      },
      {
        when: function (response) {
          return (response.structureType === 'Model');
        },
        type: 'list',
        name: 'drupalType',
        message: 'Do you what to use a Drupal Type?',
        choices: this.modelDrupalTypes,
      },
    ];

    this.prompt(prompts, function (props) {
      console.log
      this.templateName = _s.underscored(_s.camelize(props.templateName));

      if(props.structureType) {
        this.templateType = props.structureType.toLowerCase();
      }

      if(props.drupalType) {
       this.drupalType = props.drupalType.toLowerCase();
     }

      done();
    }.bind(this));
  }
  else {
    this.templateName = this.options.templateName;
    this.templateType = this.options.templateType;
    this.drupalType = this.options.drupalType;
    done();
  }
};

TemplateGenerator.prototype.generateTemplate = function () {
  var ext = 'html.twig';
  var templatesDirectory = validDir.getValidatedFolder(this.templatesDirectory);
  this.template('template.js', path.join(templatesDirectory, this.templateName + '.' + ext));
};

module.exports = TemplateGenerator;
