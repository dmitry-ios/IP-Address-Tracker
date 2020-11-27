const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const run = require("gulp-run");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const csso = require("gulp-csso");
const rename = require("gulp-rename");

// Clean

const clean = () => {
  return del("dist");
}

// Webpack

const webpack = () => {
  return run("webpack --mode production").exec().pipe(sync.stream());
};

exports.webpack = webpack;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Libraries

const jsLib = () => {
  return gulp.src("node_modules/leaflet/dist/leaflet.js")
    .pipe(gulp.dest("source/js"))
    .pipe(sync.stream());
}

const cssLib = () => {
  return gulp.src("node_modules/leaflet/dist/leaflet.css")
    .pipe(csso())
    .pipe(rename("leaflet.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(sync.stream());
}

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "dist"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/**/*",
    "source/img/**/*"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("dist"));
}

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"))
    .pipe(sync.stream());
}

exports.html = html;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/js/**/*.js", gulp.series("webpack"));
}

// Build

gulp.task("build", gulp.series(clean, styles, cssLib, jsLib, webpack, copy, html));

exports.default = gulp.series(
  "build", server, watcher
);
