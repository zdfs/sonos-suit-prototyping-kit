var gruntConfig = {

	clean: {

		dev: [ 'public' ],
		deploy: [ 'deploy' ]

	},

	sass: {

		dev: {

			files:
			[{
				expand: true,
				cwd: 'assets/scss',
				src: ['*.scss'],
				dest: 'public/styles/src',
				ext: '.css'
			}]

		}

	},

	cssmin: {

		dev: {
			expand: true,
			cwd: 'public/styles/src',
			src: ['**/*.css'],
			dest: 'public/styles/min',
			ext: '.css'
		}

	},

	express: {

		dev: {

			options: {
				script: 'server.js'
			}

		}

	},

	concat: {

		js: {
			src: ['public/scripts/src/*.js'],
			dest: 'public/scripts/src/all.js'
		}

	},

	copy: {

		images: {
			expand: true,
			cwd: 'assets/images',
			src: '**',
			dest: 'public/images'
		},

		js: {
			expand: true,
			cwd: 'assets/scripts',
			src: '**',
			dest: 'public/scripts/src'
		}

	},

	uglify: {
    js: {
      files: [{
        expand: true,
        cwd: 'public/scripts/src',
        src: '*.js',
        dest: 'public/scripts/min'
      }]
    }
  },

	jade: {

		dev: {

			options: {
				pretty: true,
				data: {
					debug: false,
					linkPath: ''
				}
			},

			expand: true,
			cwd: 'views',
			src: ['**/*.jade', '!**/common/**'],
			dest: 'public/',
			ext: '.html'
		},

		deploy: {

			options: {
				pretty: true,
				data: {
					debug: false,
					linkPath: '<%= pkg.homepage %>/public'
				}
			},

			expand: true,
			cwd: 'views',
			src: ['**/*.jade', '!**/common/**'],
			dest: 'public/',
			ext: '.html'
		}

	},

	watch: {

		express: {
			files:  [ 'views/**/**/*.jade' ],
			tasks: ['jade:dev'],
			options: {
				livereload: true
			}
		},

		sass: {
			files: ['assets/scss/**/*.scss'],
			tasks: ['sass:dev', 'cssmin:dev']
		},

		styles: {
			files: ['assets/styles/**/*.css'],
			tasks: ['cssmin:dev']
		},

		scripts: {
			files: ['assets/scripts/*.js'],
			tasks: ['copy:js', 'concat:js', 'uglify:js']
		},

		livereload: {
			options: {
				livereload: true
			},
			files: [
				'public/styles/**/*.css',
				'public/scripts/**/*js'
			]
		}

	}

};

module.exports = function(grunt) {

	gruntConfig.pkg = grunt.file.readJSON('package.json');

	grunt.initConfig(gruntConfig);

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('predeploy', [ 'clean',
																		'sass',
																		'copy',
																		'concat',
																		'uglify',
																		'cssmin'
																		]);

	grunt.registerTask('default', [ 'predeploy',
																	'express' ]);

	grunt.registerTask('deploy', [ 'predeploy', 'jade:deploy']);

};