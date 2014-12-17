'use strict';

module.exports = function (grunt) {

    // configurable paths
    var yeomanConfig = {
        app: 'web',
        dist: 'dist'
      };

    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        availabletasks: {           // task
            tasks: {
                options: {
                    filter: 'exclude',
                    tasks: ['availabletasks', 'tasks', 'connect', 'connect:livereload']
                }
            }               // target
        },
        concat: {
            dist: {
                src: [
                    yeomanConfig.app + '/vendor/bootstrap-sass/dist/js/bootstrap.js', // Bootstrap JS
                    yeomanConfig.app + '/js/*.js', // All JS in the libs folder
                    yeomanConfig.app + '/js/global.js'  // This specific file
                ],
                dest: yeomanConfig.app + '/js/dist/production.js',
            }
        },
        uglify: {
            build: {
                src: yeomanConfig.app + '/js/dist/production.js',
                dest: yeomanConfig.app + '/js/dist/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: yeomanConfig.app + '/images/src',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: yeomanConfig.app + '/images/dist/',
                }]
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: yeomanConfig.app + '/styles/sass',
                    cssDir: yeomanConfig.app + '/styles',
                    importPath: yeomanConfig.app + '/vendor',
                    imagesDir: yeomanConfig.app + '/images',
                    javascriptsDir: yeomanConfig.app + '/scripts',
                    fontsDir: yeomanConfig.app + '/styles/fonts',
                }
            },
        },
        watch: {
            scripts: {
                files: [yeomanConfig.app + '/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                    livereload:true
                },
            },
            css: {
                files: [
                    yeomanConfig.app + '/js/*.js',
                    yeomanConfig.app + '/scripts/*.js',
                    yeomanConfig.app + '/scripts/*/*.js'
                ],
                tasks: ['compass'],
                options: {
                    spawn: false,
                    livereload:true
                }
            },
            test: {
                files: ['test/spec/**/*.js', yeomanConfig.app + '/js/**/*.js', 'test/SpecRunner.js'],
                tasks: 'exec'
            },
            all: {
                files: 'index.html',
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    yeomanConfig.app + '/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    yeomanConfig.app + '/images/{,*/}*'
                ]
            }
        },
        exec: {
          jasmine: {
            command: 'phantomjs test/lib/run-jasmine.js http://localhost:9001/test',
            stdout: true
          }
        },
        connect: {
            options: {
                port: 9001,
                livereload:35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        yeomanConfig.app
                    ]
                }
            },
        },
    });

    // Where we tell Grunt we plan to use some plug-ins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-available-tasks');
    grunt.loadNpmTasks('grunt-exec');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default',[
        'concat',
        'uglify',
        'imagemin',
        'compass',
        'connect:livereload',
        'watch',
        'exec'
    ]);
    grunt.registerTask('tasks', ['availabletasks']);
    grunt.registerTask('server', ['connect:livereload', 'watch']);
};
