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

var paths = {
  allJS: './**/*.js',
  allCSS: './**/*.css',
  frameworkComponents: 'ic/**/*.js',
  frameworkMain: 'is/app.js',
  frameworkTemplates: './**/*.htm',
  pugTemplates: './**/*.pug',
  frameworkCSS: './**/*.css',
};

gulp.task('css-concat', function () {
  return gulp.src([paths.editorCSS, paths.frameworkCSS])
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('test/'));
});

gulp.task('concat', function(cb) {
    pump([
        gulp.src(['!./templates.js', './is/app.js', paths.allJS, '!./gulpfile.js']),
        babel({ presets: ['es2015']}),
        ngAnnotate(),
        concat('all.min.js'),
        uglify(),
        gulp.dest('./')
     ],
     function(err){ console.log('pipe finished: ', err || 'no errors');}
   );
});

// gulp.task ('moveFwTemplates', function() {
//   pump([
//     gulp.src ([paths.frameworkTemplates, '!inhouse-website-framework/index.html']),
//     gulp.dest('build/templates/framework')
//   ],
//   function(err){
//     console.log('move finished: ', err || 'no errors');
//   })
// });


//render all other pages
gulp.task ('otherTemplates', function() {
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
  gulp.src(['!./index.html', './**/*.html', paths.frameworkTemplates])
  .pipe(templateCache({standalone: true, base: function(file) {
    return 'build/templates/' + file.relative;
  }}))
  .pipe(gulp.dest('./'));
});

// //////////////////
// // Stylus Tasks
// /////////////////
// gulp.task('styles', function() {
//   gulp.src(['src/**/*.styl'])
//       .pipe(stylus())
//       .pipe(gulp.dest('src'))
// });
//
// //////////////////
// // Pug Tasks
// /////////////////
//
// gulp.task ('index_page', function() {
//   gulp.src ('./src/index.pug')
//     .pipe(pug())
//     .on('error', function(e){
//       console.log('PUG ERROR >>>> ', e.message)
//       this.emit('end')
//     })
//     .pipe(ext_replace('.blade.php'))
//     .pipe(gulp.dest('../resources/views'))
// });

// //////////////////
// // Babel Tasks
// /////////////////
//
// gulp.task('babel', function() {
//   // add function to ignore the scripts after initial build
// 	gulp.src(['src/**/*.js'])
//     .pipe(sourcemaps.init())
// 		.pipe(babel({
// 			presets: ['es2015']
// 		}))
//     .on('error', function(e){
//       console.log("BABEL ERROR >>>> ", e.message)
//       this.emit('end')
//     })
//     .pipe(sourcemaps.write())
// 		.pipe(gulp.dest('build'))
// });

//////////////////
// Watch Tasks
/////////////////

gulp.task('watch', function(){
  gulp.watch([paths.pugTemplates], ['otherTemplates']);
  gulp.watch(['./**/*.html', paths.frameworkTemplates], ['templatecache']);
 //  gulp.watch(paths.styles, ['styles']);
 //  gulp.watch(paths.indexPage, ['index_page']);
  gulp.watch(['./is/app.js', paths.allJS, '!./gulpfile.js', '!./templates.js'], ['concat']);
});

gulp.task('default', ['otherTemplates', 'templatecache', 'concat', 'watch']);
