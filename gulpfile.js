var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var pug = require ('gulp-pug');
var babel = require('gulp-babel');
var ext_replace = require('gulp-ext-replace');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var ngAnnotate = require('gulp-ng-annotate');
var paths = require('./paths');

gulp.task('concat-css', function () {
  return gulp.src(paths.allCSS)
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('concat', function() {
    pump([
        gulp.src(['!dev/vendor.min.js','!dev/templates.js', '!dev/ua/data/user-data.js', paths.frameworkMain, paths.allJS]),
        // sourcemaps.init(),
        concat('all.min.js'),
        babel({ presets: ['es2015']}),
        ngAnnotate(),
        // uglify(),
        // sourcemaps.write(),
        gulp.dest('./build/')
     ],
     function(err){ console.log('pipe finished: ', err || 'no errors');}
   );
});

gulp.task('concat-vendor', function() {
    pump([
        gulp.src(paths.vendorFiles),
        concat('vendor.min.js'),
        babel({ presets: ['es2015']}),
        ngAnnotate(),
        uglify(),
        gulp.dest('./')
     ],
     function(err){ console.log('vendor finished: ', err || 'no errors');}
   );
});

//render all other pages
gulp.task ('pugTemplates', function() {
  return gulp.src ([paths.pugTemplates])
  .pipe(pug())
  .on('error', function(e){
    console.log('PUG ERROR >>>> ', e.message);
    this.emit('end');
  })
  .pipe(gulp.dest('build/templates'));
});


//////////////////
// Template Caching
/////////////////
gulp.task('templatecache', function() {
  gulp.src(['!./dev/index.html', '.dev/**/*.html', paths.frameworkTemplates])
  .pipe(templateCache({standalone: true, base: function(file) {
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
  gulp.watch([paths.allCSS], ['css-concat']);
  gulp.watch(['./dev/**/*.html', paths.frameworkTemplates], ['templatecache']);
  gulp.watch(['./dev/ic/**/*.js'], ['concat']);
});

gulp.task('default', ['pugTemplates', 'templatecache', 'concat', 'concat-css', 'watch']);
