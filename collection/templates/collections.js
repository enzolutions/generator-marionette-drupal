define([
  'backbone'<% if (!_.isEmpty(collectionModel)) { %>,
  'model/<%= collectionModel %>'<% } %><% if (!_.isEmpty(collectionInheritName)) { %>,
  'collections/<%= collectionInheritName %>'<% } %>
],
function( <%=_.classify('backbone')%><% if (!_.isEmpty(collectionModel)) { %>, <%=_.classify(collectionModel)%><% } %><% if (!_.isEmpty(collectionInheritName)) { %>, <%=_.classify(collectionInheritName)%><% } %> ) {
    'use strict';

  /* Return a collection class definition */
  return <% if (!_.isEmpty(collectionInheritName)) { %><%=_.classify(collectionInheritName)%>.extend <% } else { %>Backbone.Collection.extend<% } %>({
    initialize: function() {
      console.log("initialize a <%= _.classify(Collection) %> collection");
    }<% if (!_.isEmpty(collectionModel)) { %>,

    model: <%= _.classify(collectionModel) %>
    <% } %>
  });
});
