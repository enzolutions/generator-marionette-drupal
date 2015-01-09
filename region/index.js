'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

module.exports = RegionGenerator;

function RegionGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(RegionGenerator, yeoman.generators.NamedBase);

RegionGenerator.prototype.askFor = function () {
  var done = this.async();

  var prompts = [
    {
      type: 'string',
      name: 'regionName',
      message: 'What is the name for new region?',
      validate: function( value ){
        if(value.trim()){
          return true;
        }else{
          return  "Region name can’t be empty";
        }
      },
    },
    {
      type: 'string',
      name: 'regionID',
      message: 'What is the HTML id for new region?',
      validate: function( value ){
        if(value.trim()){
          return true;
        }else{
          return  "Region HTML id can’t be empty";
        }
      },
    },
  ];

  this.regions =  this.config.get('regions');

  this.conflictRegion = null;

  this.prompt(prompts, function (props) {

    this.regions.forEach(function (region) {
      if (region.name === props.regionName || region.id === props.regionID) {
        this.conflictRegion = region;
        return true;
      }
    }.bind(this));

    if (this.conflictRegion) {
      console.log('Your request cannot be process because has conflicts with the following region');
      console.log('Region: ', this.conflictRegion);
    }
    else {
      this.appDirectory = this.config.get('appDirectory');
      this.regions.push({name: props.regionName, id: props.regionID});
      this.config.set('regions', this.regions);
      console.log('Region was added sucessfully. Remember add the proper HTML for region');
    }

    done();
  }.bind(this));
};

RegionGenerator.prototype.generateRegions = function () {
  if (!this.conflictRegion) {
    this.appDirectory = this.config.get('appDirectory');
    // Set force overwrite template to avoid ask to end user
    this.conflicter.force = true;
    this.regions =  this.config.get('regions');
    this.template('regions.js', this.appDirectory + '/scripts/regions.js');
  }
};
