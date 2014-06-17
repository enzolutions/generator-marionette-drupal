'use strict';

module.exports = function (grunt) {

    // configurable paths
    var yeomanConfig = {
        app: '<%= appDirectory %>',
        dist: 'dist'
      };

    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    yeomanConfig.app + '/js/libs/*.js', // All JS in the libs folder
                    yeomanConfig.app + '/js/global.js'  // This specific file
                ],
                dest: yeomanConfig.app + '/js/build/production.js',
            }
        },
        uglify: {
            build: {
                src: yeomanConfig.app + '/js/build/production.js',
                dest: yeomanConfig.app + '/js/build/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: yeomanConfig.app + '/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: yeomanConfig.app + '/images/build/'
                }]
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: yeomanConfig.app + '/styles/sass',
                    cssDir: yeomanConfig.app + '/styles',
                    importPath: yeomanConfig.app + '/<%= bowerDirectory %>',
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
                },
            },
            css: {
                files: [yeomanConfig.app + '/styles/sass/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            }
        }
    });

    // Where we tell Grunt we plan to use some plug-ins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'compass', 'watch']);
};
