var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps')
var stylus = require('gulp-stylus');
var pug = require ('gulp-pug');
var babel = require('gulp-babel');
var ext_replace = require('gulp-ext-replace');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');

var paths = {
  frameworkComponents: 'ic/**/*.js',
  frameworkMain: 'is/app.js',
  frameworkTemplates: './**/*.htm',
  frameworkCSS: './**/*.css',
}

gulp.task('css-concat', function () {
  return gulp.src([paths.editorCSS, paths.frameworkCSS])
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('test/'));
});

gulp.task('concat', function(cb) {
    pump([
         gulp.src([paths.frameworkMain, paths.frameworkComponents]),
         sourcemaps.init(),
         concat('all.min.js'),
        //  babel({ presets: ['es2015']}),
        //  .pipe(uglify())
         sourcemaps.write(),
         gulp.dest('build/')
     ],
     function(err){ console.log('pipe finished: ', err || 'no errors');}
   );
});

gulp.task ('moveFwTemplates', function() {
  pump([
    gulp.src ([paths.frameworkTemplates, '!inhouse-website-framework/index.html']),
    gulp.dest('build/templates/framework')
  ],
  function(err){
    console.log('move finished: ', err || 'no errors');
  })
});


//render all other pages
gulp.task ('otherTemplates', function() {
  return gulp.src ([paths.editorTemplates])
  .pipe(pug())
  .on('error', function(e){
    console.log('PUG ERROR >>>> ', e.message)
    this.emit('end')
  })
  .pipe(gulp.dest('build/templates'));
});


//////////////////
// Template Caching
/////////////////
gulp.task('templatecache', function() {
  gulp.src(['build/templates/**/*.html', 'build/templates/**/*.htm'])
  .pipe(templateCache({standalone: true, base: function(file) {
    return 'build/templates/' + file.relative;
  }}))
  .pipe(gulp.dest('build'));
});

//////////////////
// Stylus Tasks
/////////////////
gulp.task('styles', function() {
  gulp.src(['src/**/*.styl'])
      .pipe(stylus())
      .pipe(gulp.dest('src'))
});

//////////////////
// Pug Tasks
/////////////////

gulp.task ('index_page', function() {
  gulp.src ('./src/index.pug')
    .pipe(pug())
    .on('error', function(e){
      console.log('PUG ERROR >>>> ', e.message)
      this.emit('end')
    })
    .pipe(ext_replace('.blade.php'))
    .pipe(gulp.dest('../resources/views'))
});

//////////////////
// Babel Tasks
/////////////////

gulp.task('babel', function() {
  // add function to ignore the scripts after initial build
	gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
    .on('error', function(e){
      console.log("BABEL ERROR >>>> ", e.message)
      this.emit('end')
    })
    .pipe(sourcemaps.write())
		.pipe(gulp.dest('build'))
});

//////////////////
// Watch Tasks
/////////////////

gulp.task('watch', function(){
  gulp.watch([paths.editorTemplates, paths.frameworkTemplates, '!inhouse-website-framework/index.html'], ['otherTemplates']);
  gulp.watch(paths.theTemplates, ['templatecache']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.indexPage, ['index_page']);
  gulp.watch(['inhouse-website-framework/is/app.js', 'src/app.js', paths.editorComponents, paths.frameworkComponents], ['concat']);
});

gulp.task('default', ['otherTemplates', 'moveFwTemplates', 'templatecache', 'concat', 'css-concat', 'watch']);
