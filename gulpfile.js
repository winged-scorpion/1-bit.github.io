var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var dantist = 'dantist';
var grow = 'growtag';
var test = 'test';
var item = test;

const paths = {
    css: {
        src: item + '/src/scss/*.scss',
        dest: item + '/dest/style'
    },
    scripts: {
        src: item + '/src/scripts/*.js',
        dest: item + '/dest/scripts/'
    }
};

function reload(done) {
    browserSync.reload();
    done();
}

function serve(done) {
    browserSync.init({
        server: {
            baseDir: './' + item
        }
    });
    done();
}




function style() {
    return (
        gulp
            .src(paths.css.src)
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(gulp.dest(paths.css.dest))
    );
}

function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('index.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

const watch = () => {
    gulp.watch(paths.css.src, gulp.series(style));
    gulp.watch(paths.scripts.src, gulp.series(scripts));
    gulp.watch(item + '/**/*', gulp.series(reload))
};


exports.default = gulp.series(style, serve, watch, scripts);




