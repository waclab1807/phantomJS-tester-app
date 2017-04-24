var grunt = require('grunt');
var config = require('./config/config');

grunt.initConfig({
	sass: {
		dist: {
			options: {
				style: 'compressed'
			},
			files: config.css
		}
	},
	watch: {
		css: {
			files: 'public/scss/*.scss',
			tasks: ['sass', 'exec:buildpdf']
		},
		html: {
			files: ['views/*.ejs'],
			tasks: ['exec:buildpdf']
		},
		js: {
			files: 'public/javascripts/*.js',
			tasks: ['exec:buildpdf']
		}
	},
	nodemon: {
		dev: {
			script: 'bin/www',
			options: {
				ignore: ['tests/**', 'public/**']
			}
		}
	},
	exec: {
		buildpdf: './node_modules/phantomjs/bin/phantomjs --ssl-protocol=any --ignore-ssl-errors=true --disk-cache=false phantom/pdfize.js http://localhost:' + config.port + '/ preview.pdf'
	},
	concurrent: {
		dev: [
			'nodemon',
			'watch'
		],
		options: {
			logConcurrentOutput: true
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-githooks');
grunt.loadNpmTasks('grunt-nodemon');
grunt.loadNpmTasks('grunt-exec');
grunt.loadNpmTasks('grunt-concurrent');

grunt.registerTask('dev', ['concurrent']);
