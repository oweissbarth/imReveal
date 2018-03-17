var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');
 
gulp.task('typescript', function () {
    return gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'imReveal.js'
        }))
        .pipe(sourcemaps.write())
        .pipe(minify({ext:{min: '.min.js'}}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('styles', function(){
    return gulp.src('src/**/*.css')
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', function() {
    gulp.start('typescript', 'styles');
});
