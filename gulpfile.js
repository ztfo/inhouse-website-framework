var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var ext_replace = require('gulp-ext-replace');
var pug = require('gulp-pug');
var uglifycss = require('gulp-uglifycss');
var order = require('gulp-order');
var stylus = require('gulp-stylus');
var Filter = require('gulp-filter');
var bower = require('gulp-bower');
var version = require('./package.json');
var ngAnnotate = require('gulp-ng-annotate');

var config = {
  bowerDir: './bower_components'
};

var paths = {
  scripts: ['dev/is/app.js', 'dev/**/*.js', '!dev/ia/**/*.js'],
  vendorScripts: 'dev/ia/js/**/*.js',
  styles: 'dev/**/*.css',
  images: ['dev/**/*.jpg', 'dev/**/*.svg'],
  srcTemplates: ['dev/**/*.pug', 'dev/**/*.pug'],
  buildTemplates: 'build/templates/**/*.html',
};


// Scripts
gulp.task('scripts', function() {
  return gulp
    .src(paths.scripts)
    .pipe(order([
      'dev/is/app.js',
      'dev/**/*.js'
    ]))
    .pipe(concat('all.min.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('build/'));
});

// CSS
gulp.task('css', function() {
  return gulp
    .src(paths.styles)
    .pipe(concat('bundle.css'))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('build/'));
});

// Images
gulp.task('images', function() {
  return gulp
    .src(paths.images)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

// Include vendor scripts
// incomplete bower
gulp.task('bower', function() {
  return bower()
    .pipe()
});

gulp.task('vendor-files', function() {
  return gulp
    .src(paths.vendorScripts)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('build/'));
});

// Render templates
gulp.task('templates', function() {
  gulp.src(paths.srcTemplates)
    .pipe(pug())
    .on('error', function(e) {
      console.log('PUG ERROR >>>> ', e.message)
      this.emit('end')
    })
    .pipe(gulp.dest('build/templates'));
});

// Watchers
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.styles, ['css']);
  gulp.watch(paths.srcTemplates, ['templates']);
  gulp.watch(paths.buildTemplates, ['templatecache']);
});

// Template Caching
gulp.task('templatecache', function() {
<<<<<<< HEAD
  return gulp.src(['build/templates/**/*.html', 'build/templates/**/**/*.html'])
  .pipe(templateCache({module: 'frameworkTemplates', standalone: true, base: function(file) {
    return 'build/templates/' + file.relative;
  }}))
  .pipe(gulp.dest('./build'));
});

// //////////////////
// // Stylus Tasks
// /////////////////
// gulp.task('styles', function() {
//   gulp.src(['src/**/*.styl'])
//       .pipe(stylus())
//       .pipe(gulp.dest('src'))
// });


//////////////////
// Watch Tasks
/////////////////

gulp.task('watch', function(){
  gulp.watch([paths.pugTemplates], ['pugTemplates']);
  gulp.watch([paths.allCSS], ['concat-css']);
  gulp.watch(['./dev/**/*.html', paths.frameworkTemplates], ['templatecache']);
  gulp.watch(['./dev/ic/**/*.js', './dev/is/**/*.js'], ['concat']);
  gulp.watch(['dev/ia/'], ['move-ia']);
  gulp.watch(['dev/ua/'], ['move-ua']);
=======
  gulp.src(paths.buildTemplates)
    .pipe(templateCache({
      module: 'frameworkTemplates',
      standalone: true,
      base: function(file) {
        return 'build/templates/' + file.relative;
      }
    }))
    .pipe(gulp.dest('build/'));
>>>>>>> develop
});

gulp.task('default', ['watch', 'scripts', 'css', 'images', 'templates', 'vendor-files', 'templatecache']);
