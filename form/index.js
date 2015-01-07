'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var requestSync = require('sync-request');
var validDir = require('../helpers/validateDirectory');
var listDir = require('../helpers/listDirectory');
var _s = require('underscore.string');

module.exports = ActionGenerator;

function ActionGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(ActionGenerator, yeoman.generators.NamedBase);

ActionGenerator.prototype.askFor = function () {
  var done = this.async();

  this.actionsDirectory = this.config.get('formsDirectory');
  this.backendServer = this.config.get('backendServer');
  this.backendAuthToken = this.config.get('backendAuthToken');
  this.viewsDirectory = this.config.get('viewsDirectory');
  this.regions = this.config.get('regions');
  this.MVC = this.config.get('MVC');

  this.regionsName = [];

  this.regions.forEach(function (region) {
    this.regionsName.push(region.name);
  }.bind(this));

  this.actions =  this.config.get('actions');

  var viewsDir = validDir.getValidatedFolder(this.viewsDirectory);

  var views = listDir.getListFolder(viewsDir);

  this.conflictAction = null;
  this.Action = null;

  var prompts = [
    {
      type: 'list',
      name: 'entity',
      message: 'What entity you want to use to generate a form?',
      choices: [ 'Comment', 'Node' ],
      filter: function (val) { return val.toLowerCase(); }
    },
    {
      type: 'list',
      name: 'bundle',
      message: 'What entity bundle you want use to generate a form?',
      choices: function (response) {
        var values = [];
        var auth = 'Basic ' + this.backendAuthToken;
        var options = {
          headers: {
            'Authorization': auth,
            'Accept': 'application/json'
          }
        };

        var res;
        try {
          res = requestSync('GET', this.backendServer + '/bundles/' + response.entity, options);
          if (res.statusCode === 200) {
            var bundles = [];
            res = JSON.parse(res.body.toString());
            for (var index in res ) {
              bundles.push({value: index, name: res[index]});
            }
            return bundles;
          }
          else {
            this.log(yosay('Backend Server ' + this.backendServer + '/bundles/' + response.entity  + ' Error code: ' + res.statusCode));
            process.kill();
          }
        }
        catch (ex) {
          if (typeof(res) === 'undefined') {
            this.log(yosay('Backend Server is not available, execute: $ yo marionette-drupal:settings to update information'));
          } else {
            this.log(yosay('Backend Server ' + this.backendServer  + ' Error code: ' + res.statusCode));
          }

          process.kill();
        }

        return values;
      }.bind(this),
      filter: function (val) { return val.toLowerCase(); }
    },
    {
      type: 'list',
      name: 'viewMode',
      message: 'What view mode you want use to generate a form?',
      choices: function (response) {
        var values = [];
        var auth = 'Basic ' + this.backendAuthToken;
        var options = {
          headers: {
            'Authorization': auth,
            'Accept': 'application/json'
          }
        };

        var res;
        try {
          res = requestSync('GET', this.backendServer + '/view_modes/' + response.entity + '/' + response.bundle, options);
          if (res.statusCode === 200) {
            var viewModes = [];
            res = JSON.parse(res.body.toString());
            for (var index in res ) {
              viewModes.push({value: index, name: res[index]});
            }
            return viewModes;
          }
          else {
            this.log(yosay('Backend Server ' + this.backendServer + '/view_modes/' + response.entity  + '/' + response.bundle + ' Error code: ' + res.statusCode));
            process.kill();
          }
        }
        catch (ex) {
          if (typeof(res) === 'undefined') {
            this.log(yosay('Backend Server is not available, execute: $ yo marionette-drupal:server to update information'));
          } else {
            this.log(yosay('Backend Server ' + this.backendServer  + ' Error code: ' + res.statusCode));
          }

          process.kill();
        }

        return values;
      }.bind(this),
      filter: function (val) { return val.toLowerCase(); }
    },
  ];

  this.prompt(prompts, function (props) {

    var auth = 'Basic ' + this.backendAuthToken;
    var options = {
      headers: {
        'Authorization': auth,
        'Accept': 'application/json'
      }
    };

    var res;
    try {
      res = requestSync('GET', this.backendServer + '/entity/entity_form_display/' + props.viewMode, options);
       if (res.statusCode === 200) {
          var fields = [];
          var ignoreFields = ['uid', 'created', 'comment', 'path'];

          var inputTypes = {
            string_textfield: 'input',
            taxonomy_autocomplete: 'input',
            email_default: 'input',
            number: 'input',
            text_textfield: 'textarea',
            text_textarea: 'textarea',
            text_textarea_with_summary: 'textarea',
            boolean_checkbox: 'boolean',
            datetime_timestamp: 'datepicker',
            datetime_default: 'datepicker',
            image_image: 'button',
            options_select: 'select'
            //'radio', 'spacer', 'button'
          };

          res = JSON.parse(res.body.toString());
          for (var field in res.content ) {
            if (ignoreFields.indexOf(field) < 0) {
              console.log(res.content[field].type);
              if(typeof(inputTypes[res.content[field].type]) != 'undefined') {
                fields.push({id: field, label: _s.humanize(_s.strRight(field, 'field_')), type: inputTypes[res.content[field].type], options: JSON.stringify({}), settings: res.content[field]});
              }
            }
          }

          this.model = props.entity;
          this.name = props.entity + '_' + props.bundle;
          this.fields = fields;
       }
       else {
            this.log(yosay('Backend Server ' + this.backendServer + '/entity/entity_form_display/' + props.viewMode  + ' Error code: ' + res.statusCode));
            process.kill();
          }
    }
    catch (ex) {
      console.log('Error code: ' + res.statusCode);
    }

    done();
  }.bind(this));
};

ActionGenerator.prototype.generateActions = function () {
  this.formsDirectory = this.config.get('formsDirectory');

  //Set MVC
  this.MVC.push({type: 'form', model: this.model, form: this.name});
  this.config.set('MVC', this.MVC);

  var ext = 'js';
  this.template('form.js', this.formsDirectory + '/' + this.name + '.' + ext);


  if (!this.conflictAction) {
    this.actionsDirectory = this.config.get('actionsDirectory');

  }
};
