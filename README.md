[Yeoman](http://yeoman.io) [MarionetteJS](http://marionettejs.com) + [Drupal](http://drupal.org) generator

This generator create a HTML 5 application using a MVC pattern implemented with MarionetteJS and Backbone.Drupal for data model.

Also the HTML 5 application includes [Grunt](http://gruntjs.com) support to automate tasks and [Jasmine](jasmine.github.io) for Unit Tests.

All Models, Collections, Views, Regions, Actions (Route + Controller) and Forms as generated as **RequireJS** modules encapsulated enabling the option to reuse each concepts in different areas of your application.

Compass is used to generate CSS using bootstrap-sass.

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/enzolutions/generator-marionette-drupal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

- [Application Structure](#application-structure)
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

##Getting Started##

### Install Dependencies

In order to use the Marionette Drupal generator is required install  Yeoman, Bower and Grunt running the following command:
```bash
$ npm install -g yo grunt-cli bower
```

Install Marionette Drupal generator

```bash
$ npm install -g generator-marionette-drupal
```

### Create a Marionette Drupal project

Finally, initiate the generator in a empty folder

```bash
$ yo marionette-drupal
```

![yeoman generator](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/yo_marionette_drupal_generator.png "yeoman generator")

You have to define where do you want the app installed *web* is recommended, also you have to define where do you want the Bower components installed *vendor* is recommended.

### Execute sample application

The generator create a simple sample application using an empty model, simple view and render without region.

Your new project has integration with Grunt and more specifically  with [connect](https://github.com/gruntjs/grunt-contrib-connect) and [livereload](https://github.com/gruntjs/grunt-contrib-livereload) and [watch](https://github.com/gruntjs/grunt-contrib-watch). So to open your new project just execute grunt using one of the following commands.

```bash
$ grunt

$ grunt watch
```
This command above will open a your application in the following URL **http://localhost:9001** and you will see a similar result as shown in following image.

![MarionetteJS sample application](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/you_marionette_drupal_sample_app.png "MarionetteJS sample application")

**No webserver is not requiered.**

The objetive of this sample application is just demostrate the environment is ready to work and you can use the [Scaffolding](#scaffolding) commands to build your application.

##Scaffolding##

### Generate a template

```bash
$ yo marionette-drupal:template
```

The command above will create an empty template inside application folder app_folder/templates_folder using [Twig.js](https://github.com/justjohn/twig.js)

This command is interactive as you can see in the follwing image

![Template Generation](https://github.com/enzolutions/generator-marionette-drupal/blob/master/images/generator_marionette_drupal_template.png "Template Generation")

### Generate a Model
```bash
$ yo marionette-drupal:model
```
The command above start an interactive interface to provide a Model Name and if a Jasmime Test unit must be created for new Model.

In the following image you see how the command looks

![Model Generation](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_model.png "Model Generation")

### Generate a Collection
```bash
$ yo marionette-drupal:collection
```
The command above start an interactive interface to provide a Collection Name, select **Model** to be used in collection items and if a Jasmime Test unit must be created for new Model.

In the following image you see how the command looks

![Collection Generation](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_collection.png "Collection Generation")

Also in this sub generator is possible create a collection extending from other collection like **students** extending from **people**.

### Generate a View

```bash
$ yo marionette-drupal:view
```

The command above start an interactive interface to provide a View Name to create a Marionette ItemViewand defining what **Model** or **Collection** will be integrate with the new view, also a what **Template** will be associated with view ( a new template could be generated or choose one from templates available)

Optionally Jasmime Test unit could be created for new Model.

In the following image you see how the command looks

![Model Generation](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_view.png "Model Generation")

### Update settings
This generator store some information in a hidden file **.yo-rc.json** about where must be located templates, models, views etc and Drupal conection.

If you need change one of this information there is a sub generator to allow you to that to avoid edit that sensitive file, just use the following command.

```bash
$ yo marionette-drupal:view
```

In the following image you see how the command looks

![Update Settings](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/generator_marionette_drupal_settings.png "Update Settings")

I use [Inquirer](https://github.com/SBoudrias/Inquirer.js) to create the interactive menu, but even the documentation say you can navigate with keyword arrows doen't work, I have a reported [issue](https://github.com/SBoudrias/Inquirer.js/issues/199). So use the numbers to navigate

## Integration with Jasmine
This generator enable the option to create simple unit test against model and views, this generation is optional in sub generators **model** and **view**.

The idea is you can continue improving the unit test generated to meet the requirements of your application.

To access the unit tesst access the URL **http://localhost:9001/test/** remember the Unit Test **test** folder is configurable via initial generator, but could updated via sub generator **settings**

Check how Unit Test page looks

![Unit Test](https://github.com/enzolutions/generator-marionette-drupal/blob/master/images/generator_maronette_drupal_jasmine_unit_test.png "Unit Test")

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

- Update documentation for action, region and form sub generators
- Update documentation about list of commands implemented in grunt
- Create RoadMap
- Update Forms project to enable image fields
- Link form to Drupal POST actions and test the results
- Create Layout Scaffolding command
- Improve commands to avoid empty entries
