define([
  'backbone.marionette',
],
function (<%= _.classify('marionette') %>){
    'use strict';

  var <%= _.classify(name) %>Form = Backform.Form.extend({
    initialize: function() {
      console.log("initialize a <%= _.classify(name) %> Form");
    },
    model: new Backbone.Drupal.Models.<%= _.classify(model) %>(),
    fields: [<% _.each(fields, function (field) { %>
      {name: "<%= field.id %>", label: "<%= _.classify(field.id) %>", control: "<%= _.classify(field.type) %>"},<% }); %>
    ],
  });

  return <%= _.classify(name) %>Form;

});
