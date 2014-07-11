define([
	'backbone.marionette',
	'backbone.wreqr'
],
function (Marionette, Wreqr) {
  'use strict';

	var Communicator = Marionette.Controller.extend({
		initialize: function (options) {
			console.log('initialize a Communicator');

			// create a pub sub
			this.mediator = new Wreqr.EventAggregator();

			//create a req/res
			this.reqres = new Wreqr.RequestResponse();

			// create commands
			this.command = new Wreqr.Commands();
		}
	});

	return new Communicator();
});
