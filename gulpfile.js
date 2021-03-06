'use strict';

var gulp = require('gulp');
//var cleanCSS = require('gulp-clean-css');
var eol = require('gulp-eol');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var trimlines = require('gulp-trimlines');

gulp.task('build:sass', function() {
	return gulp.src('src/assets/sass/styles.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('src/assets/css/'));
});

gulp.task('build:css', function () {
	return gulp.src('src/assets/css/*.css')
		.pipe(autoprefixer({
			"browsers": ["last 30 versions", "ie 9"],
			"cascade": true,
			"remove": true
		}))
		.pipe(gulp.dest('src/assets/css/'));
});

gulp.task('clean', function () {
	return del([
		'src/css/*'
	]);
});

function reloader(done) {
	browserSync.reload();
	done();
}

gulp.task('serve', gulp.series('build:sass', 'build:css', function(done) {
	browserSync.init({
		server: 'src',
		port: 3000,
		open: true
	});
	gulp.watch('src/assets/sass/**/*', gulp.series('build:sass', 'build:css',reloader));
	//gulp.watch('src/assets/css/*.css', gulp.series('build:css', reloader))
	gulp.watch([
		'src/*.html', 'src/**/*.js'
	], gulp.series(reloader));
	done();
}));

gulp.task('default', gulp.series('serve'));
