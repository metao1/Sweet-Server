'use strict';

var gulp = require('gulp'),
    concat = require("gulp-concat"),
    eslint = require('gulp-eslint'),
    gulpsass = require('gulp-sass'),
    bourbon = require('node-bourbon').includePaths,
    browserSync = require('browser-sync'),
    mainBowerFiles = require('main-bower-files'),
    deploypages = require('gulp-gh-pages'),
    ngAnnotate = require('gulp-ng-annotate'),
    gulpFilter = require('gulp-filter'),
    serve = require('gulp-serve'),
    cssmin = require("gulp-cssmin"),
    del = require('del'),
    uglify = require("gulp-uglify"),
    lunrindex = require('./gulp-plugins/gulp-lunrindex.js'),
    sitemap = require('./gulp-plugins/gulp-sitemap.js');

var dest = './client',
    fontName = 'appfont';

gulp.task('fonts', function () {
    return gulp.src(['./src/assets/fonts/**'])
        .pipe(gulp.dest(dest + '/assets/fonts/'));
});

gulp.task('iconfont', function () {
    return gulp.src('./src/assets/icons/symbol-font-16px.sketch')
        .pipe(sketch({
            export: 'artboards',
            formats: 'svg'
        }))
        .pipe(iconfont({
            fontName: fontName,
            appendCodepoints: true,
            descent: 80
        }))
        .pipe(gulp.dest(dest + '/assets/fonts'))

});

gulp.task('lint', function () {
    return gulp.src(['src/lib/**', 'src/lib/**/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('styles', function () {
    return gulp.src([
        './src/stylesheets/app.scss'
    ])
        .pipe(cssmin())
        .pipe(gulpsass({
            outputStyle: 'expanded',
            includePaths: [
                './stylesheets/app'
            ].concat(bourbon),
            errLogToConsole: true
        }))
        .pipe(gulp.dest(dest + '/assets/css'));
});

var bowerFiles = mainBowerFiles({
    path: {
        bowerDirectory: 'bower_components',
        bowerJson: 'bower.json'
    },
    debugging: false
});

gulp.task('js', function () {
    return gulp.src(bowerFiles.concat(["./src/app.js", /*'./src/libs*//*',*/ "./src/services/*", './src/controllers/*', "./src/directives/*"]))
        .pipe(gulpFilter('**/*.js'))
        .pipe(ngAnnotate())
        .pipe(concat('/assets/js/lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest));
});

gulp.task('html:main', function () {
    return gulp.src(['./src/*.html'])
        .pipe(gulp.dest(dest));
});

gulp.task('html:partials', function () {
    return gulp.src(['./src/partials/*.html'])
        .pipe(gulp.dest(dest.concat('/partials')))
});

gulp.task("html", ["html:main", "html:partials"]);

gulp.task('lunrindex', function () {
    return gulp.src('./src/sitemap.json')
        .pipe(lunrindex({filename: 'searchindex.json'}))
        .pipe(gulp.dest(dest));
});

gulp.task('sitemap', function () {
    return gulp.src('./src/sitemap.json')
        .pipe(sitemap({url: 'http://blog.avesty.com/#'}))
        .pipe(gulp.dest(dest));
});

gulp.task('img', function () {
    return gulp.src(['./src/assets/img/**'])
        .pipe(gulp.dest(dest + '/assets/img'));
});

gulp.task('deploypages', function () {
    return gulp.src('./dest/**/*')
        .pipe(deploypages({branch: 'master'}));
});

gulp.task('clean', function () {
    del(['./dest/assets'], function (path) {
        console.log('Build folder is deleted\n');
    });
    del(['./dest/data'], function (path) {
        console.log('Build folder is deleted\n');
    });
    del(['./dest/index.html'], function (path) {
        console.log('Build folder is deleted\n');
    });
    del(['./dest/sitemap.json'], function (path) {
        console.log('Build folder is deleted\n');
    });
    del(['./dest/sitemap.xml'], function (path) {
        console.log('Build folder is deleted\n');
    });
    del(['./dest/searchindex.json'], function (path) {
        console.log('Build folder is deleted\n');
    });
});

gulp.task('watch', function () {
    gulp.watch(['./src/*.js', './src/**/*.js'], ['js']);
    gulp.watch('./src/*.html', ['html']);
    gulp.watch(['./src/stylesheets/**', './src/stylesheets/**/**'], ['styles']);
    /*gulp.watch('./src/assets/img*/
    /**', ['img']);*/
});

gulp.task('serve', serve('dest'));

gulp.task('browser-sync', function () {
    browserSync.init(["./src/*.html", "./src/partials/*.html",
        "./src/*.json", "./src/stylesheets/*.scss", "./src/stylesheets/**/*.scss",
        "./src/assets/scss/**/*.scss"], {
        proxy: "http://localhost:3000",
        files: ["client/**/*.*"],
        browser: "firefox",
        port: 7000
    });
});

gulp.task('default', ['clean', 'html', 'styles', 'js', 'img', 'lunrindex', 'sitemap', 'browser-sync'], function () {
    gulp.watch(["src/controllers/*.js", "src/*", "bower_components/**/*.js", "src/directives/*.js"
        , "src/services/*.js"], ['js']);
    gulp.watch(["src/*.html", "src/partials/*.html"], ['html']);
    gulp.watch(["src/stylesheets/*.scss", "src/stylesheets/**/*.scss"], ['styles']);
    gulp.watch("src/*.json", ['json']);
    gulp.watch("src/sitemap.json", ['sitemap']);
    gulp.watch(["src/img/*.*", "src/img/**/*.*"], ['images']);
});
