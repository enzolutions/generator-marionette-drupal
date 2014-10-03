define([
  'backbone.marionette'<% if (!_.isEmpty(tmpl)) { %>,
  'twig',
  'text!tmpl/<%= tmpl%>.html.twig'<% } %>
],
function(<%= _.classify('marionette') %><% if (!_.isEmpty(tmpl)) { %>, Twig, <%= _.classify(tmpl)%>_Tmpl<% } %>){
    'use strict';

  var <%= _.classify(name) %>View = Marionette.ItemView.extend({
    initialize: function() {
      console.log("initialize a <%= _.classify(name) %> View");
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
    }*/<% if (!_.isEmpty(tmpl)) { %>,
    template: function(data) {
      var template = Twig.twig({
          data: <%= _.classify(name) %>_Tmpl
      });
      return template.render(data);
    }

    <% } %>
  });

  return <%= _.classify(name) %>View;

});
