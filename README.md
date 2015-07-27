[Yeoman](http://yeoman.io) [MarionetteJS](http://marionettejs.com) + [Drupal](http://drupal.org) generator

This generator create a HTML 5 application using a MVC pattern implemented with MarionetteJS and Backbone.Drupal for data model.

Also the HTML 5 application includes [Grunt](http://gruntjs.com) support to automate tasks and [Jasmine](jasmine.github.io) for Unit Tests.

All Models, Collections, Views, Regions, Actions (Route + Controller) and Forms as generated as **RequireJS** modules encapsulated enabling the option to reuse each concepts in different areas of your application.

Compass is used to generate CSS using bootstrap-sass.

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/enzolutions/generator-marionette-drupal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

- [Application Structure](#application-structure)
- [Drupal Configuration](#drupal-configuration)
- [Getting Started](#getting-started)
    - [Install Generator](#install-generator)
    - [Create a Marionett + Drupal Project](#create-a-marionette-drupal-project)
    - [Execute Sample Application](#execute-sample-application)
- [Scaffolding](#scaffolding)
- [Integration with Jasmine](#integration-with-jasmine)
- [Integration with Grunt](#integration-with-grunt)
- [ToDo](#todo)

##Application Structure##

```
├── Gruntfile.js
├── bower.json
├── node_modules
├── package.json
└── web ( Configurable: web is recommended)
    ├── 404.html
    ├── actions
    ├── collections
    ├── favicon.ico
    ├── form ( Configurable: Model edit Form with Backform)
    ├── images
    ├── index.html
    ├── js
    ├── models
    ├── robots.txt
    ├── scripts (application scripts)
    ├── styles
    ├── test (Configurable: Jasmine Unit Test folder)
    ├── templates
    ├── vendor ( Configurable: vendor is recommended)
    └── views
```

##Drupal Configuration##

The step zero is configure and prepare your Drupal installation to accept request specially if you are planning to execute your HTML5 application in another domain, all details about how to do this could be check in page project of [Backbone Drupal](https://github.com/enzolutions/backbone.drupal)

##Getting Started##

### Install Dependencies

Yeoman, Bower and Grunt are required in order to use the Marionette Drupal generator. They can be installed by running the following command:
```bash
$ npm install -g yo grunt-cli bower
```

Install Marionette Drupal generator

```bash
$ npm install -g generator-marionette-drupal
```

### Create a Marionette Drupal project

Finally, initiate the generator in an empty folder

```bash
$ yo marionette-drupal
```

![yeoman generator](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/yo_marionette_drupal_generator.png "yeoman generator")

The Yeoman wizard enables you to define settings of your HTML5 + CSS3 Backbone/MarionneteJS application.

### Execute sample application

The generator create a simple sample application using an empty model, simple view and render inside a content region.

Your new project has integration with Grunt and more specifically with [connect](https://github.com/gruntjs/grunt-contrib-connect) and [livereload](https://github.com/gruntjs/grunt-contrib-livereload) and [watch](https://github.com/gruntjs/grunt-contrib-watch). So to open your new project just execute grunt using one of the following commands.

```bash
$ grunt

$ grunt watch
```
This command above will open your application in the following URL **http://localhost:9001** and you will see a similar result as shown in following image.

![MarionetteJS sample application](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/you_marionette_drupal_sample_app.png "MarionetteJS sample application")

**No webserver is required.**

The objective of this sample application is just demonstrate the environment is ready to work and you can use the [Scaffolding](#scaffolding) commands to build your application.

##Scaffolding##

### Generate a template

```bash
$ yo marionette-drupal:template
```

The command above will create an empty template inside application folder app_folder/templates_folder using [Twig.js](https://github.com/justjohn/twig.js)

This command is interactive as you can see in the following image

![Template Generation](https://github.com/enzolutions/generator-marionette-drupal/blob/master/images/generator_marionette_drupal_template.png "Template Generation")

### Generate a Model
```bash
$ yo marionette-drupal:model
```
The command above start an interactive interface to provide a Model Name and if a Jasmime Test unit must be created for new Model.

In the following image you see how the command looks

![Model Generation](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_model.png "Model Generation")

If you choose **None** you can define a custom end point for your model

### Generate a Collection
```bash
$ yo marionette-drupal:collection
```
The command above start an interactive interface to provide a Collection Name, select **Model** to be used in collection items and if a Jasmime Test unit must be created for new Model.

Right now you must to set the end point URL relative to Drupal Backend Server.

In the following image you see how the command looks like.

![Collection Generation](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_collection.png "Collection Generation")

Also in this sub-generator is possible create a collection extending from other collections like **students** extending from **people**.

### Generate a View

```bash
$ yo marionette-drupal:view
```

The command above starts an interactive interface to provide a View Name to create a Marionette ItemView and define what **Model** or **Collection** will be integrate with the new view, also what **Template** will be associated with view (a new template could be generated or chosen from templates available).

Optionally a Jasmine Test unit could be created for new Model.

In the following image you see how the command looks

![Model Generation](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_view.png "Model Generation")

Internally the generator store the MVC relation between view and model/collection to be used in the **Action** sub-generator.

### Add a Region

```bash
$ yo marionette-drupal:region
```

Regions are HTML containers where views are rendered. You can create as many regions your design require.

Each region matches with an HTML element in which the view is rendered.

![Add Region](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_region.png "Add Region")

After adding a region you must edit your HTML app file accordingly. Here is an example.

```
<div id="sidebar"></div>
```

In our App example is located in **web/index.html**, remember **web** could change if you choose a different location for App.

### Generate an Action

This generator took some terms from Symfony Application where they have the concepts of Routing, Class Controller and Actions methods. These terms match with Backbone routing and controller and actions are functions in controllers associated to routes.

Instead of creating three commands, I decided to combine in a single command named **Action**

This command enables you to add dynamically a new Route to your application and associate to a Controller function to response to the routing.

Also the system avoid to create an inline function in controller, a new RequireJS module **Action** is generated and is invoked inside the controller.

The separation in Controller enables a complete isolation of logic between actions.

Besides the route and controller, the action requires a view be rendered inside the region specified.

In the following image you see how the command looks

![Action Generator](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_action.png "Action Generator")

The action will provide code to fetch the information for model/collection. It is your responsibility to change the proper ID as you can see in following example.

```
var best_exchange  = new BestExchangeCollection({});

// Load Collection
best_exchange.fetch({
success: function (Collection) {
  var best_exchanges = new BestExchangesView({collection: Collection});
  region.show();
}
});
```
### Generate a Form

```bash
$ yo marionette-drupal:form
```

**Only available for Drupal 8**

This command generate forms implementing library [Backform](http://amiliaapp.github.io/backform/index.html).

This generator enables integration with Drupal to fetch information about entities to create an HTML 5 Form to enable end users push information to the Drupal server.

This generator fetches entity information and create form matching entity fields and linked with proper REST Post to save information.

In the following image you see how the command looks

![Form Generator](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_form.png "Form Generatior")

This sub-generator is still in progress, and the process to push back info to Drupal 8 is in progress, we will use the REST method PATCH because PUT won't be implemented in Drupal 8.

#### Drupal 8 Setup to Enable Form Generator

In order to use this command the Drupal 8 Module [Entity REST extra](https://www.drupal.org/project/entity_rest_extra) must be installed and enabled in your Drupal 8 server.

After enable the module you have enable Rest Resources **entity/{entity}/{bundle}/fields** and **entity/{entity}/bundles**.

Drupal 8 will not support CORS until 8.1 release, for that reason if you are need your Marionette JS App runs in a different domain apply the patch [https://www.drupal.org/node/1869548#comment-9120317](https://www.drupal.org/node/1869548#comment-9120317) recommended by [Backbone.Drupal](https://github.com/enzolutions/backbone.drupal#cross-origin)

Remember to enable [mod_headers](http://httpd.apache.org/docs/current/mod/mod_headers.html) if you are using Apache.

Be sure the user you provide to connect to server have permissions to fetch extra information.

### Update settings
This generator store some information in a hidden file **.yo-rc.json** about where must be located templates, models, views etc and Drupal connection.

If you need change one of this information there is a sub generator to allow you to that to avoid edit that sensitive file, just use the following command.

```bash
$ yo marionette-drupal:settings
```

In the following image you see how the command looks

![Update Settings](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_settings.png "Update Settings")

I use [Inquirer](https://github.com/SBoudrias/Inquirer.js) to create the interactive menu, but even the documentation say you can navigate with keyword arrows doesn't work, I have reported [issue](https://github.com/SBoudrias/Inquirer.js/issues/199). So use the numbers to navigate.

## Integration with Jasmine
This generator enables the option to create simple unit test against model and views, this generation is optional in sub-generators **model** and **view**.

The idea is you can continue improving the unit test generated to meet the requirements of your application.

To access the unit tests, go to the URL **http://localhost:9001/test/**. Remember the Unit Test **test** folder is configurable via initial generator, but could updated via sub generator **settings**

Check how Unit Test page looks

![Unit Test](https://github.com/enzolutions/generator-marionette-drupal/blob/master/images/generator_maronette_drupal_jasmine_unit_test.png "Unit Test")

You must select what entity you want create a form between Nodes and Comments, after that the generator create a list of Bundles available and after select the bundle the view modes for the bundle selected.

The form is generated using the fields present in bundle view mode.

If you update your content type bundle in Drupal 8 maybe you wanna re run the form generator.

## Integration with Grunt

This generator provide a initial Grunt file to execute minimal tasks, you can run all tasks available with following command.

```bash
$ grunt
```

If you prefer you can execute any specific command among listed below.

#### Concat

```bash
$ grunt contact
```

Enable concat all JS files.

Todo: Configure the proper JS files and enable CSS files

#### Uglify

```bash
$ grunt uglify
```

Minify JS file combined in Contact tasks.

Todo: Configure minify for CSS files.

#### Imagemin

```bash
$ grunt imagemin
```

Optimize images in your project.

#### Compass

```bash
$ grunt compass
```

Enable process SASS files to generate CSS files in your project. This project include [bootstrap-sass](https://github.com/twbs/bootstrap-sass)

#### Watch

```bash
$ grunt watch
```

Monitor when SASS files are modified to generate new CSS files.

##ToDo

- [ ] Implement PATCH method in forms submit against Drupal 8
- [ ] Update form sub generator to review image fields
- [ ] Update documentation about list of commands implemented in grunt
- [ ] Create RoadMap
- [ ] Update Forms project to enable image fields
- [ ] Create Layout Scaffolding command
