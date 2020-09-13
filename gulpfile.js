// var gulp = require("gulp");
// var less = require("gulp-less");
// var plumber = require("gulp-plumber");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var server = require("browser-sync").create();
//
// gulp.task("style", function () {
//   gulp.src("source/css/style.less")
//   .pipe(plumber())
//   .pipe(less())
//   .pipe(postcss([
//     autoprefixer()
//   ]))
//   .pipe(gulp.dest("source/css"))
//   .pipe(server.stream())
// });
//
// gulp.task("serve", ["style"], function () {
//   server.init({
//     server:"source/"
//   });
//
//   gulp.watch("source/blocks/*.less", ["style"]);
//   gulp.watch("source/*.html")
//     .on("change", server.reload);
// });
//
// gulp.task("build", function (done) {
//   run("style", done);
// });

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');

gulp.task('less', function(done) {
    gulp.src("css/*.less")
        .pipe(less())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());

    done();
});

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

gulp.task('default', gulp.series('less', 'serve'));

var webp = require("gulp-webp");

gulp.task("webp", function () {
  return gulp.src("img/catalog/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("img/catalog"));
});


var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");

gulp.task("sprite", function () {
  return gulp.src("img/*.svg")
  .pipe(svgstore({
    inLineSvg: true
  }))
  .pipe(rename("sprite_2.svg"))
  .pipe(gulp.dest("img"))
});
