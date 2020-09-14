var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var webp = require("gulp-webp");
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');


// less to css
gulp.task('less', function(done) {
    gulp.src("css/*.less")
        .pipe(less())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
    done();
});

// css to min.css
gulp.task('css', function () {
    var plugins = [
        autoprefixer({overrideBrowserslist: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('css/style.css')
        .pipe(postcss(plugins))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('css'));
});

// localhost
gulp.task('serve', function(done) {

    browserSync.init({
        server: ""
    });

    gulp.watch("blocks/*.less", gulp.series('less'));
    gulp.watch("*.html").on('change', () => {
      browserSync.reload();
      done();
    });

    done();
});

gulp.task('default', gulp.series('less','css', 'serve'));

// png or jpg to webp
gulp.task("webp", function () {
  return gulp.src("img/catalog/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("img/catalog"));
});


// svg to sprite.svg
gulp.task("sprite", function () {
  return gulp.src("img/*.svg")
  .pipe(svgstore({
    inLineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("img"))
});
