
// REQUIREMENTS
//======================================
var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence'),
    minifyCSS = require('gulp-minify-css');




// VARIABLES
//======================================


// Style Tasks
//======================================
gulp.task('less', function() {
    return gulp.src('src/style/app.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public'));
});


// Clean Tasks
//=====================================
gulp.task('clean', function () {
    return gulp.src('public/*.css', {read: false})
        .pipe(clean());
});


//Js Tasks
//====================================
gulp.task('scriptsConcat', function() {
    return gulp.src('/src/**/*.js')
        .pipe(concat('base.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));
});



//Whatch Tasks
//====================================
gulp.task('whatchStyle' , function () {
    gulp.watch('src/style/**/*.less' , ['styleBuild']);
});

gulp.task('whatchJs' , function () {
    gulp.watch('src/js/**/*.js' , ['scriptsConcat']);
});

gulp.task('whatchAll', ['whatchStyle' , 'whatchJs'], function() {});




// Style build task
gulp.task('styleBuild' , function (callback) {
    runSequence('clean', 'less', callback)
});