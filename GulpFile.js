
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
    minifyCSS = require('gulp-minify-css'),
    babel = require('gulp-babel'),
    htmlmin = require('gulp-html-minifier');




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
gulp.task('cleanStyle', function () {
    return gulp.src('public/*.css', {read: false})
        .pipe(clean());
});
gulp.task('cleanJs', function () {
    return gulp.src('public/*.js', {read: false})
        .pipe(clean());
});
gulp.task('cleanAll', function () {
    return gulp.src(['public/*.css' , 'public/*.js'], {read: false})
        .pipe(clean());
});



//Js Tasks
//====================================
gulp.task('scriptsConcat', function() {
    return gulp.src([
            'src/js/lib/*.js',
            'src/js/main.js',
            'src/js/service/*.js',
            'src/js/pages/*.js',
            'src/js/components/*.js'
        ])
        .pipe(babel())
        .pipe(concat({ path: 'base.js', stat: { mode: 0666 , newLine: ';'}}))
        .pipe(uglify())
        .pipe(gulp.dest('public'));
});

//HTML Tasks
//====================================
gulp.task('minifyHtml', function() {
    gulp.src('./src/template/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./public/template'))
});


//Whatch Tasks
//====================================
gulp.task('whatchStyle' , function () {
    gulp.watch('src/style/**/*.less' , ['styleBuild']);
});

gulp.task('whatchJs' , function () {
    gulp.watch('src/js/**/*.js' , ['scriptsConcat']);
});

gulp.task('whatchHTML' , function () {
    gulp.watch('src/template/*.html' , ['minifyHtml']);
});

gulp.task('whatchAll', ['whatchStyle' , 'whatchJs', 'whatchHTML'], function() {});




// Style build task
gulp.task('styleBuild' , function (callback) {
    runSequence('cleanStyle', 'less', callback)
});

gulp.task('scriptBuild' , function (callback) {
    runSequence('cleanJs', 'scriptsConcat', callback)
});

gulp.task('projectBuild' , function (callback) {
    runSequence('cleanAll', 'scriptsConcat', 'styleBuild', callback)
});
