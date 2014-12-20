define([
  'backbone.marionette',
  'model/<%= ViewModel %>'<% if (!_.isEmpty(templateName)) { %>,
  'twig',
  'text!template/<%= templateName %>.html.twig'<% } %>
],
function(<%= _.classify('marionette') %>, <%= _.classify(ViewModel) %>_Model<% if (!_.isEmpty(templateName)) { %>, Twig, <%= _.classify(templateName)%>_Template<% } %>){
    'use strict';

  var <%= _.classify(View) %>View = Marionette.ItemView.extend({
    initialize: function() {
      console.log("initialize a <%= _.classify(View) %> View");
    }
    // Organizing UI more info: http://marionettejs.com/docs/marionette.itemview.html#organizing-ui-elements
    /*ui: {
      paragraph: 'p',
      button: '.my-button'
    },*/
    // Register event in view using UI
    /*events: {
      'click @ui.button': 'clickedButton'
    },*/
    // Sample of event reaction function.
    /*clickedButton: function() {
      console.log('I clicked the button!');
    }*/<% if (!_.isEmpty(templateName)) { %>,
    template: function(data) {
      var template = Twig.twig({
          data: <%= _.classify(View) %>_Template
      });
      return template.render(data);
    },
    model: <%= _.classify(ViewModel) %>_Model

    <% } %>
  });

  return <%= _.classify(View) %>View;

});
