<strong><%= _.humanize(templateName) %> template</strong><br/>
<% if (templateType == 'none') { %>
  Each model property create a variable in template <br/>
  print using the following format:<br/>
  {% set print = '{# {{ myProperty }} #}' %}
  {{ print }}
<% } %>
<% if (templateType == 'model') { %>
  <% if (drupalType != 'none') { %>
Model debug <br/>
{% for property in <%= drupalType %>|keys %}
  {% set current_property = <%= drupalType %>[property][0] %}
  <i>Property {{ property }}</i>: {{ current_property.value}}<br/>
{% endfor %}
<% } else { %>
  Each model property create a variable in template <br/>
  print using the following format:<br/>
  {% set print = '{# {{ myProperty }} #}' %}
  {{ print }}
<% } %>
<% } %>
<% if (templateType == 'collection') { %>
{% for model in items %}
  Collection debug <br/>
  {% for key in model|keys %}
    {% set current_property = model[key] %} <br/>
    Property: {{ key }}<br/>
    {% if current_property is not empty %}
      {% for property_key in current_property|keys %}
        {{property_key}} : {{ current_property[property_key]}} <br/>
      {% endfor %}
    {% endif %}
  {% endfor %}
{% endfor %}
<% } %>
