![](http://i.imgur.com/JHaAlBJ.png)


> [Yeoman](http://yeoman.io) [MarionetteJS](http://marionettejs.com) + [Drupal](drupical.org) generator


## Application Structure

```
├── Gruntfile.js
├── bower.json
├── node_modules
├── package.json
└── web
    ├── 404.html
    ├── favicon.ico
    ├── images
    ├── index.html
	  ├── js
	  ├── models
	  ├── robots.txt
	  ├── scripts
	  ├── styles
	  ├── templates
	  ├── vendor
	  └── views
```

## Known Issues

When  you are trying to create you application, the combination of dependencies between packages require you define what version os underscore you want to install and you will get a message similar to following image.

[![yeoman generator](https://raw.githubusercontent.com/enzolutions/generator-marionette-drupal/master/images/yo_marionette_drupal_resolving_conflict.png)]

If you only see the question mark symbol, without any indication, you need to change the log level of npm using the folowing command.

```
$ npm config set loglevel error
```

## Getting Started

### Install Generator

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-marionette-drupal from npm, run:

```bash
$ npm install -g generator-marionette-drupal
```

### Create a Marionette Drupal project

Finally, initiate the generator in a empty folder

```bash
$ yo marionette-drupal
```

### Integration with Grunt

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

## Scaffolding

### Generate a template

```bash
$ yo marionette-drupal:tmp name
```

This command will create an empty template inside application folder [app_folder]/*templates*
