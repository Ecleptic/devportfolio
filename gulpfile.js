var gulp = require('gulp')
var plumber = require('gulp-plumber')
var uglify = require('gulp-uglify')
var sass = require('gulp-sass')
var wait = require('gulp-wait')
var rename = require('gulp-rename')
var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync').create()


gulp.task('scripts', function() {
    return gulp.src('js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err)
                this.emit('end')
            }
        })))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'))
})

gulp.task('styles', function () {
    return gulp.src('./scss/styles.scss')
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
})
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
})

// gulp.task('watch', ['scripts', 'styles','browser-sync'], function() {
//     gulp.watch('js/*.js', ['scripts'])
//     gulp.watch('scss/*.scss', ['styles'])
//     gulp.watch("*.html").on('change', browserSync.reload)

// })
gulp.task('watch', function() { //TODO: Check this from parent
    gulp.watch('js/scripts.js', gulp.series('scripts'));
    gulp.watch('scss/styles.scss', gulp.series('styles'));
});
