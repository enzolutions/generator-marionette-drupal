'use strict';

module.exports = function (grunt) {

    // configurable paths
    var yeomanConfig = {
        app: '<%= appDirectory %>',
        vendor: '<%= bowerDirectory %>',
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
            js: {
                src: [
                    yeomanConfig.app + '/js/*.js', // All JS in the libs folder
                    yeomanConfig.app + '/js/global.js'  // This specific file
                ],
                dest: yeomanConfig.app + '/js/dist/production.js',
            },
            css: {
                src: [
                    yeomanConfig.app + '/' + yeomanConfig.vendor + '/backform/3rd/bootstrap2.3.min.css', // Bootstrap CSS
                    yeomanConfig.app + '/' + yeomanConfig.vendor + '/backform/3rd/bootstrap-datepicker.css', // Bootstrap Datapicker CSS
                    yeomanConfig.app + '/styles/main.css', // All JS in the libs folder
                ],
                dest: yeomanConfig.app + '/css/dist/production.css',
            },
        },
        uglify: {
            build: {
                src: yeomanConfig.app + '/js/dist/production.js',
                dest: yeomanConfig.app + '/js/dist/production.min.js'
            }
        },
        cssmin: {
          target: {
            files: [{
              src: [yeomanConfig.app + '/css/dist/production.css'],
              dest: yeomanConfig.app + '/css/dist/production.min.css',
            }]
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
                    importPath: yeomanConfig.app + '/' + yeomanConfig.vendor,
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
                files: [yeomanConfig.app + '/styles/sass/*.scss'],
                tasks: ['compass:dist', 'concat:css', 'cssmin'],
                options: {
                    spawn: false,
                    livereload:true
                }
            },
            test: {
                files: ['test/spec/**/*.js', 'test/SpecRunner.js'],
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
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-available-tasks');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default',[
        'concat',
        'uglify',
        'cssmin',
        'imagemin',
        'compass',
        'connect:livereload',
        'watch'
    ]);
    grunt.registerTask('tasks', ['availabletasks']);
    grunt.registerTask('server', ['connect:livereload', 'watch']);
};
