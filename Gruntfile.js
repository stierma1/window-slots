module.exports = function(grunt) {

  grunt.initConfig({
    mocha_istanbul: {
      coverage: {
        src: ["test"], // load used folders
        options: {
          mask: '**/*.js',
          excludes: ["**/test/**"], //we dont care about test coverage of our testing code
          print: "both", //prints both detailed and summary test data
          mochaOptions: [],
          istanbulOptions: ['--handle-sigint']
        }
      }
    },
    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
          check: {
            lines: 80,
            statements: 80
          }
        }
      }
    },
    jshint:{
      options:{
        esnext:true,
        curly: true,
        eqeqeq: true,
        node:true
      },
      all:["Gruntfile.js", "index.js", "lib/**/*.js"]
    },
    run:{
      nools:{
        cmd: "./nools-build.sh"
      }
    },
    webpack:{
      build: {
	       // webpack options
	      entry: "./client/index.js",
	      output: {
		      path: "build/",
		      filename: "main.js",
          libraryTarget: "commonjs",
          library: "window-slots"
	      },
        externals: ["request"],

	      stats: {
		      colors: false,
		      modules: true,
		      reasons: true
	      },
        node: {
          fs: "empty"
        },
	      progress: true, // Don't show progress
	      failOnError: true, // don't report error to grunt if webpack find errors
	      watch: false, // use webpacks watcher
	      keepalive: false, // don't finish the grunt task
	      inline: false,  // embed the webpack-dev-server runtime into the bundle
	      hot: false // adds the HotModuleReplacementPlugin and switch the server to hot mode
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks("grunt-run");
  //grunt.registerTask('jshint', ['jshint:all']);
  grunt.registerTask('test', ['jshint', 'mocha_istanbul:coverage']);
  grunt.registerTask('build', ['run:nools', "webpack:build"]);
};
