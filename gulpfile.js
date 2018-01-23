const gulp = require('gulp'),
imageMin = require('gulp-imagemin'),
babel = require('gulp-babel'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
minifyCSS = require('gulp-clean-css'),
rename = require('gulp-rename'),
server = require('gulp-webserver'),
php = require('gulp-connect-php'),
browserSync = require('browser-sync');
gutil = require('gulp-util');

/* -- TOP LEVEL FUNCTIONS --
  gulp.task - define tasks
  gulp.src - point to files to use
  gulp.dest - points to folder to output
  gulp.watch - watch files and folders for changes
*/

gulp.task('init', () => {
  return console.log('Gulp is running...');
});

// Copy all HMTL files
gulp.task('copyRoot', () => {
  gulp.src('src/*')
    .pipe(gulp.dest('build'));
  gulp.src('src/templates/*')
    .pipe(gulp.dest('build/templates'));
});

gulp.task('copyFonts', () => {
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('build/fonts'))
});

// Optimize Images
gulp.task('imageMin', () => {
  gulp.src('src/img/*')
    .pipe(imageMin())
    .pipe(gulp.dest('build/img'));
});

// Concatenate and minify the Javascripts!
gulp.task('js', () => {
  gulp.src('src/js/*.js')
    // make sure you npm install babel-preset-es2015 and babel-core!
    .pipe(babel({
      "presets": ["es2015"]
    }))
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
  gulp.src('src/js/static/*.js')
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', () => {
  gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'));
});

// Compile SASS and minify production CSS
gulp.task('sass', () => {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('default', ['init', 'js', 'css', 'sass', 'copyRoot', 'copyFonts']);

// Watches for changes to avoid repetetive running of gulp command
gulp.task('watch', () => {
  gulp.watch('src/img/*', ['imageMin']);
  gulp.watch('src/js/*.js', ['concat-js']);
  gulp.watch('src/js/process/script.js', ['minify-js']);
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.htm', ['copyHTML']);
});

// Server with gulp-php-connect
gulp.task('php', () => {
  php.server({
    hostname: 'localhost',
    bin: 'C:/MAMP/bin/php/php7.1.5/php.exe',
    ini: 'C:/MAMP/bin/php/php7.1.5/php.ini',
    port: 8000,
    base: 'C:/Users/mango/dev/portfolio-v2/build/',
    livereload: true
  });
});

gulp.task('end-php', function() {
    php.closeServer();
});


// Server with gulp-webserver
// gulp.task('server', () => {
//   gulp.src('./')
//     .pipe(server({
//       livereload: true,
//       directoryListing: true,
//       open: true
//     }));
// });
