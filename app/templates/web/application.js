define([
	'backbone.marionette',
	'communicator',
	'../views/main',
	'../models/empty'
],

function (Marionette, Communicator, MainView, EmptyModel) {
  'use strict';

  var emptyModel = new EmptyModel();

  // Set a custom data in model to show in template
  emptyModel.set('success', 'Congrats Yeoman for Marionette + Drupal is Working');


	var mainView = new MainView({model: emptyModel});

	var App = new Marionette.Application();

	/* Add application regions here */
	App.addRegions({});

	/* Add initializers here */
	App.addInitializer(function () {
		// Using the render result because we don't have region yet to render
		document.body.innerHTML = mainView.render().el.innerHTML;
		Communicator.mediator.trigger('APP:START');
	});

	return App;
});
