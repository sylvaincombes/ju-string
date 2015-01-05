module.exports = function (grunt) {

    "use strict";

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    var banner = '/** ' +
        '\n* <%= pkg.name %>' +
        '\n* <%= pkg.description %>\n* ' +
        '\n* @author : <%= pkg.author.name %> <<%= pkg.author.email %>>' +
        '\n* @version : <%= pkg.version %>' +
        '\n* @date <%= grunt.template.today("yyyy-mm-dd") %>\n */';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            options: {
                browserifyOptions: {
                    debug: true,
                    standalone: '<%= pkg.name %>'
                },
                banner: banner
            },
            'build/ju/string.js': 'src/string.js',
            'build/tests/tests.js': 'tests/*.js'
        },

        exorcise: {
            bundle: {
                options: {},
                files: {
                    'build/ju/string.js.map': ['build/ju/string.js']
                }
            }
        },

        uglify: {
            options: {
                banner: banner + '\n'
            },
            build: {
                files: {
                    'build/ju/string.min.js': ['build/ju/string.js']
                }
            }
        },

        jshint: {
            options: {
            },
            dev: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js']
        },

        tape: {
            options: {},
            files: ['tests/*.js']
        },

        instrument: {
            files: 'app/*.js',
            options: {
                lazy: true,
                basePath: 'tests/coverage/instrument/'
            }
        },

        storeCoverage: {
            options: {
                dir: 'tests/coverage/reports'
            }
        },

        makeReport: {
            src: 'tests/coverage/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'tests/coverage/reports',
                print: 'detail'
            }
        },

        jsdoc : {
            dist : {
                src: ['src/**/*.js', 'README.md'],
                options: {
                    destination: 'doc',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "jsdoc-conf.json"
                }
            }
        },

        clean: ["doc", "build"],

        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['test']
            }
        }
    });

    grunt.registerTask('build', ['jshint', 'clean', 'browserify', 'exorcise', 'uglify', 'jsdoc']);
    grunt.registerTask('test', ['build', 'tape']);
    grunt.registerTask('coverage', ['instrument', 'test', 'storeCoverage', 'makeReport']);
    grunt.registerTask('default', ['watch']);

};