/*global require*/

// plugins
var babelify        = require('babelify'),
		base64          = require('postcss-base64'),
		rollupify       = require('rollupify'),
		browserify      = require('browserify'),
		browserSync     = require('browser-sync'),
		buffer          = require('vinyl-buffer'),
		del             = require('del'),
		expand          = require('glob-expand'),
		gulp            = require('gulp'),
		historyProxy    = require('connect-history-api-fallback'),
		imgurify        = require('imgurify'),
		map             = require('map-stream'),
		merge           = require('merge-stream'),
		plugins         = require('gulp-load-plugins')(),
		pngquant        = require('imagemin-pngquant'),
		proxy           = require('http-proxy-middleware'),
		url             = require('url'),
		sassInlineImage = require('sass-inline-image'),
		scssify         = require('scssify'),
		svg             = require('svg-browserify'),
		browserifyCss   = require('browserify-css'),
		source          = require('vinyl-source-stream');

// vars
var config          = require('./gulp.paths.json'),
		base            = config.base,
		paths           = config.paths,
		files           = config.files,
		viewExtension   = config.viewExtension,
		menuLinks       = config.menuLinks,
		footerLinks     = config.footerLinks,
		jsGlob          = [
												paths.js + '**/*.js'
											],
		jsxGlob         = [
												paths.js + '**/*.js',
												paths.js + '**/*.jsx'
											],
		scssGlob        = [
												base.src + paths.scss + '**/*.scss'
											],
		scssIncludePaths= [
												base.src + paths.scssPartials,
												base.src + paths.scssComponents,
												base.tmp + paths.scss,
												require('node-normalize-scss').includePaths
											],
		cssGlob         = [
												paths.css + '**/*.css'
											],
		vendorCssGlob   = [
												base.npm + '**/*.css'
											],
		cleanGlob       = [
												base.tmp + '**',
												'!' + base.tmp,
												base.dist + paths.scripts + '**.*',
												'!' + base.dist + paths.scripts
											],
		watchPaths      = [
												base.src + '**',
												'gulpfile.js',
												'gulp-paths.json'
											],
		defaultTasks    = [
												// requires dependencies that do the rest of the build.
												'js:default'
											],
		releaseTasks    = [
												// requires dependencies that do the rest of the build.
												'js:release'
											],

		// utils
		changeHandler =  function (_evt) {
			// logs info on what has changed when watch is triggered
			console.log('\n\x1b[32m ' + _evt.path + '\x1b[0m changed\n');
		},

		// without full access to source this is not going to happen
		reload = function(){
			browserSync.reload();
		},
		// use
		// .pipe(map(_function))
		_function         = function(_file, _cb) {
			console.log(_file.contents.toString('utf-8'));
			_cb(null, _file);
		},
		testBundler,
		devBundler,
		releaseBundler;



// self invoking function wrapper to ensure strict and pass lint
(function(){

	'use strict';

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	 .|'''.|
	 ||..  '    ....  ... ..  .... ...   ....  ... ..
		''|||.  .|...||  ||' ''  '|.  |  .|...||  ||' ''
	.     '|| ||       ||       '|.|   ||       ||
	|'....|'   '|...' .||.       '|     '|...' .||.

	||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	gulp.task('browser-sync', defaultTasks, function() {
		var siteProxyConfig = {
					target: base.devServerURL + '/',
					logLevel: 'debug'
				};
		browserSync({
			server: {
				baseDir: [ base.tmp, base.src, base.src + paths.proxied ],
				index: 'index.html',
				middleware: [
					historyProxy(),
					proxy(['/api/**', '!/', '!/dist/**', '!/scripts/**'], siteProxyConfig)
				],
			},
			host: '0.0.0.0',
			eloadDelay: 1000
		});
	});

	gulp.task('browser-sync:release', releaseTasks, function() {
		var siteProxyConfig = {
					target: base.devServerURL + '/',
					logLevel: 'debug'
				};
		browserSync({
			server: {
				baseDir: [ base.dist, base.src + paths.proxied ],
				index: 'index.html',
				middleware: [
					historyProxy(),
					proxy(['/api/**', '!/scripts/**'], siteProxyConfig)
				],
			},
			host: '0.0.0.0',
			port: 3030,
			reloadDelay: 1000
		});
	});

	// reloaders to beat race condition with tasks for auto-reload
	gulp.task('reload:default', defaultTasks, browserSync.reload);
	gulp.task('reload:release', releaseTasks, browserSync.reload);

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	'|| '||'  '|'           .           '||
	 '|. '|.  .'   ....   .||.    ....   || ..
		||  ||  |   '' .||   ||   .|   ''  ||' ||
		 ||| |||    .|' ||   ||   ||       ||  ||
			|   |     '|..'|'  '|.'  '|...' .||. ||.

	 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	// watches and reloads browsersync for development environment
	gulp.task('server', ['browser-sync'], function () {
		gulp.watch( watchPaths, ['reload:default'] ).on('change', changeHandler);
	});

	// watches and reloads browsersync for development environment
	gulp.task('server:release', releaseTasks.concat(['browser-sync:release']), function () {
		gulp.watch( watchPaths, ['reload:release'] ).on('change', changeHandler);
	});

	// watches and rebuilds script for release environment
	gulp.task('watch:local', ['js:localDefault'], function () {
		gulp.watch( watchPaths, ['js:localDefault'] ).on('change', changeHandler);
	});

	// watches and rebuilds script for release environment
	gulp.task('watch:release', releaseTasks, function () {
		gulp.watch( watchPaths, ['release'] ).on('change', changeHandler);
	});

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	|''||''|                  .
	   ||      ....   ....  .||.
	   ||    .|...|| ||. '   ||
	   ||    ||      . '|..  ||
	  .||.    '|...' |'..|'  '|.'

	|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	gulp.task('test', function () {
		return gulp.src([base.src + 'test/**.js', base.src + 'test/**/*.js'], {})
			.pipe(plugins.plumber())
			.pipe( plugins.mocha(
					{
						'compilers': 'js:babel-core/register',
						'require' : ['jsdom-global/register']
					}
				));
	});

	/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	'||''|.                  ' '||''|.                          '||  '||
	 ||   || ... ..    ....     ||   ||  ... ...  .. ...      .. ||   ||    ....
	 ||...|'  ||' '' .|...||    ||'''|.   ||  ||   ||  ||   .'  '||   ||  .|...||
	 ||       ||     ||         ||    ||  ||  ||   ||  ||   |.   ||   ||  ||
	.||.     .||.     '|...'   .||...|'   '|..'|. .||. ||.  '|..'||. .||.  '|...'

	|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	// browserify-css and cssify don't handle node_modules paths properly
	// this copies css files as import ready SASS to be included with @import.
	// react-select isn't written with scss & includepaths like normalize, thus this hack.

	gulp.task('prebundle', ['clean'], function() {
		return gulp.src(vendorCssGlob)
			.pipe(plugins.plumber())
			.pipe(plugins.rename({
				prefix: '_',
				extname: '.scss'
			}))
			.pipe( gulp.dest( base.tmp + paths.scss ));
	});

/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

'||''|.                          '||  '||
 ||   ||  ... ...  .. ...      .. ||   ||    ....  ... ..   ....
 ||'''|.   ||  ||   ||  ||   .'  '||   ||  .|...||  ||' '' ||. '
 ||    ||  ||  ||   ||  ||   |.   ||   ||  ||       ||     . '|..
.||...|'   '|..'|. .||. ||.  '|..'||. .||.  '|...' .||.    |'..|'

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	devBundler = browserify({
		entries: [base.src + paths.js + paths.debug + files.jsDebug],
		// IE/Edge don't like Mimic code uncomment below and comment above
		// to test these with proxy/mocks for IE/Edge
		// entries: [base.src + paths.js + files.jsApp],
		debug: true,
		extensions: ['.jsx', '.png', '.jpg'],
		transform: svg
	})
		.transform(babelify, {})
		.transform(imgurify, {})
		//.transform(svg, {})
		.transform(require("browserify-css"), {global:true})
		.transform(scssify, {
			autoInject: {
				verbose: true,
				prepend: true,
			},
			sass : {
				includePaths : scssIncludePaths,
				functions: sassInlineImage(),
				outputStyle: 'expanded',
				sourceMapContents: true,
				sourceMapEmbed: true
			},
			postcss: {
				autoprefixer: {
					browsers: [
						'last 2 versions',
						'iOS >= 8',
						'Safari >= 8'
					]
				},
				'postcss-base64': {
					extensions: ['.svg', '.woff', '.png'],
					root: process.cwd() + '/Frontend/',
					excludeAtFontFace: false
				}
			}
		});

	releaseBundler = browserify({
	// releaseBundler = browserify({
		entries: [base.src + paths.js + files.jsApp],
		debug: false,
		extensions: ['.jsx', '.css', '.png', '.svg', '.jpg']
	})
		.transform(babelify, {})
		.transform(scssify, {
			autoInject: {
				verbose: false,
				prepend: false
			},
			includePaths : [
				base.src + paths.scssPartials,
				require('node-normalize-scss').includePaths
			],
			sass : {
				includePaths : scssIncludePaths,
				outputStyle: 'compressed',
				sourceMapContents: false,
				sourceMapEmbed: false
			},
			postcss: {
				autoprefixer: {
					browsers: [
						'last 2 versions',
						'iOS >= 8',
						'Safari >= 8'
					]
				},
				'postcss-base64': {
					extensions: ['.svg', '.woff', '.png'],
					root: process.cwd() + '/Frontend/',
					excludeAtFontFace: false
				}
			}
		})
		.transform(imgurify, {})
		.transform(svg, {})
		.transform(rollupify, {});

/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	 '||'                           .|'''.|                   ||             .
		||   ....   .... ...  ....    ||..  '    ....  ... ..  ...  ... ...  .||.
		||  '' .||   '|.  |  '' .||    ''|||.  .|   ''  ||' ''  ||   ||'  ||  ||
		||  .|' ||    '|.|   .|' ||  .     '|| ||       ||      ||   ||    |  ||
|| .|'  '|..'|'    '|    '|..'|' |'....|'   '|...' .||.    .||.  ||...'   '|.'
 '''                                                             ||
																																''''
 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	// gulp.task('js', ['scss:release', 'lint:js'], function() {
	gulp.task('js:default', [ 'test', 'prebundle', 'sprite', 'lint:scss', 'lint:js'], function() {
		return devBundler.bundle()
			.on('error', function(err){
				// print the error -- if you get this far you'll know it ;)
				plugins.util.log( plugins.util.colors.white.bgRed(err.message) );
				// end this stream
				this.emit('end');
			})
			.pipe(plugins.plumber())
			.pipe(source('debug/debug-app.js'))
			.pipe(buffer())
			.pipe(plugins.rename(files.jsAppMin))
			.pipe( gulp.dest( base.tmp + paths.scripts ));
	});

	// gulp.task('js', ['scss:release', 'lint:js'], function() {
	gulp.task('js:localDefault', [ 'test', 'prebundle', 'sprite', 'lint:scss', 'lint:js' ], function() {
		return devBundler.bundle()
			.on('error', function(err){
				// print the error -- if you get this far you'll know it ;)
				plugins.util.log( plugins.util.colors.white.bgRed(err.message) );
				// end this stream
				this.emit('end');
			})
			.pipe(plugins.plumber())
			.pipe(source('debug/debug-app.js'))
			.pipe(buffer())
			.pipe(plugins.rename(files.jsAppMin))
			.pipe( gulp.dest( base.dist + paths.scripts ));
	});

	gulp.task('js:release', ['test', 'prebundle', 'sprite', 'image-min:release', 'lint:scss', 'lint:js' ], function() {
		return releaseBundler.bundle()
			.on('error', function(err){
				// print the error -- if you get this far you'll know it ;)
				plugins.util.log( plugins.util.colors.white.bgRed(err.message) );
				// end this stream
				this.emit('end');
			})
			.pipe(plugins.plumber())
			.pipe(source('app.jsx'))
			.pipe(buffer())
			.pipe(plugins.uglify())
			.pipe(plugins.rename(files.jsAppMin))
			.pipe( gulp.dest( base.dist + paths.scripts ));
	});

	gulp.task('lint:js', function() {
		return  gulp.src(jsGlob, {
				cwd: base.src
			})
			.pipe(plugins.plumber())
			.pipe( plugins.eslint({
				plugins:['react', 'import']
			}) )
			.pipe( plugins.eslint.format() )
			.pipe( plugins.eslint.failAfterError() );
	});

/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

 .|'''.|    ..|'''.|  .|'''.|   .|'''.|
 ||..  '  .|'     '   ||..  '   ||..  '
	''|||.  ||           ''|||.    ''|||.
.     '|| '|.      . .     '|| .     '||
|'....|'   ''|....'  |'....|'  |'....|'

 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	gulp.task('lint:scss', function(){
		return gulp.src( scssGlob )
			.pipe(plugins.plumber())
			.pipe( plugins.scssLint({
					'config':'./.scss-lint.yml'
			}));
	});


	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	 .|'''.|                    ||    .
	 ||..  '  ... ...  ... ..  ...  .||.    ....   ....
		''|||.   ||'  ||  ||' ''  ||   ||   .|...|| ||. '
	.     '||  ||    |  ||      ||   ||   ||      . '|..
	|'....|'   ||...'  .||.    .||.  '|.'  '|...' |'..|'
						 ||
						''''
	 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	gulp.task('sprite', ['clean'], function () {
		var spriteStreams = gulp.src(paths.sprites + '**/*.png', {cwd:base.src})
					.pipe(
						plugins.spritesmith({
							imgName   : files.spriteImage,
							imgPath   : base.web + paths.images,
							cssName   : files.spriteCss,
							cssTemplate: base.src + paths.scssSpriteTemplates + files.spriteTemplate,
							cssVarMap : function(_sprite){
								_sprite.name = _sprite.name
									.replace( '^',':' )
									.replace( /^_/, '.' );
							}
						})
					),
					imgStream = spriteStreams.img
						.pipe(plugins.plumber())
						.pipe( gulp.dest(base.tmp + paths.images) ),
					cssStream = spriteStreams.css
						.pipe(plugins.plumber())
						.pipe( gulp.dest(base.tmp + paths.css) );
			return merge(imgStream, cssStream);
	});

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	'||'                                                ||
	 ||  .. .. ..    ....     ... .   ....  .. .. ..   ...  .. ...
	 ||   || || ||  '' .||   || ||  .|...||  || || ||   ||   ||  ||
	 ||   || || ||  .|' ||    |''   ||       || || ||   ||   ||  ||
	.||. .|| || ||. '|..'|'  '||||.  '|...' .|| || ||. .||. .||. ||.
													.|....'

	 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	gulp.task('image-min:release', ['sprite'], function(){
		return gulp.src( [
					base.src + '**/*.{png, jpg, jpeg, svg}',
					base.tmp + '**/*.{png, jpg, jpeg, svg}',
					'!' + base.src + paths.sprites + '**',
					'!' + base.src + paths.glyphs + '**'
				])
				.pipe(plugins.plumber())
				.pipe(plugins.imagemin({
						progressive : true,
						svgoPlugins : [{
							removeComments  : true,
							convertColors   : true
						}],
						use         : [ pngquant() ]
				}))
				.pipe(gulp.dest(base.dist + paths.images));
	});

	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

		..|'''.| '||
	.|'     '   ||    ....   ....   .. ...
	||          ||  .|...|| '' .||   ||  ||
	'|.      .  ||  ||      .|' ||   ||  ||
	 ''|....'  .||.  '|...' '|..'|' .||. ||.

	|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	gulp.task('clean', function(){
		return del( cleanGlob );
	});


	/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

	'||''|.             ||  '||       '||
	 ||   ||  ... ...  ...   ||     .. ||
	 ||'''|.   ||  ||   ||   ||   .'  '||
	 ||    ||  ||  ||   ||   ||   |.   ||
	.||...|'   '|..'|. .||. .||.  '|..'||.

	 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

	gulp.task('release', releaseTasks);
	gulp.task('default', defaultTasks);

}());
