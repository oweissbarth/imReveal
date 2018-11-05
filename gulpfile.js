const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

 
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
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.parallel('typescript', 'styles'));
