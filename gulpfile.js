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
  return gulp.src([
    "ia/css/bootstrap-slider.min.css",
    "ia/css/owl.carousel.css",
    "ia/css/uikit.css",
    "ia/css/sticky.min.css",
    "ia/css/slidenav.css",
    "ia/css/inhouse.css",
    "ia/icons/property-icons/ih-icons.css",
    "ic/about/css/about.css",
    "ic/featured-listings/css/featured-listings.css",
    "ic/landing-search/css/search.css",
    "ic/listing-loader/css/listing-loader.css",
    "ic/navbar/css/navbar.css",
    "ic/slider/css/slider.css",
    "ic/resources/css/resources.css",
    "ic/testimonials/css/testimonials.css",
    "ic/contact/css/contact.css",
    "ic/partners/css/partners.css",
    "ic/footer/css/footer.css",
    "ic/listing-details/css/listing-details.css",
    "ic/divider/css/divider.css",
    "ic/like-button/css/like-button.css",
    "ic/visitor-modal/css/visitor-modal.css",
    "ic/amenities/css/amenities.css",
    "ic/listing-map/css/listing-map.css",
    "ic/nearby/css/nearby.css",
    "ic/photo-slider/css/photo-slider.css",
    "ic/about-listing/css/about-listing.css",
    "ip/bios/css/ip-bios.css",
    "ip/contact/css/ip-contact.css",
    "ip/content/css/ip-content.css",
    "ip/journal/css/ip-journal.css",
    "ip/listing/css/ip-listing.css",
    "ip/narratives/css/ip-narratives.css",
    "ip/results/css/ip-results.css",
    "ip/search/css/ip-search.css",
    "ip/subdivisions/css/ip-subdivisions.css",
    "ip/system/css/ip-system.css"
  ])
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('./'));
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
  gulp.watch(['./is/app.js', paths.allJS, '!./gulpfile.js', '!./templates.js'], ['concat']);
});

gulp.task('default', ['otherTemplates', 'templatecache', 'concat', 'css-concat', 'watch']);
