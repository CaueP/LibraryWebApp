var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

// gulp task to check JavaScript file style using jshint and jscs
gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

// task to inject the packages on the HTML (Bower dependencies and my own)
gulp.task('inject', function () {
    // dependecy to inject Bower CSS and JS (Bootstrap and font-awesome)
    var wiredep = require('wiredep').stream;

    // depedency to inject my own CSS and JS files
    var inject = require('gulp-inject');

    // source files of our own files
    var injectSrc = gulp.src(['./public/css/*.css',
        './public/js/*.js'
    ], {
        read: false
    });
    var injectOptions = {
        ignorePath: '/public'
    };

    // options setting what file to look and the directory
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    // executing the injection
    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

// task to reload my application when saved
gulp.task('serve', ['style', 'inject'], function () {

    // options saying what script to be executed and files to be watched to restart
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting...');
        });
});