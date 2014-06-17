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
    }<% if (!_.isEmpty(tmpl)) { %>,
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
