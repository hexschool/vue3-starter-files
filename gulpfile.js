
const gulp = require('gulp');
const $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync'),
  autoprefixer = require('autoprefixer');
  
const minimist = require('minimist'); // 用來讀取指令轉成變數

// production || development
// # gulp --env production
var envOptions = {
  string: 'env',
  default: { env: 'development' }
};
var options = minimist(process.argv.slice(2), envOptions);
console.log(options);

gulp.task('clean', function () {
  return gulp.src(['./public', './.tmp'], { read: false, allowEmpty: true }) // 選項讀取：false阻止gulp讀取文件的內容，使此任務更快。
    .pipe($.clean());
});

gulp.task('layout', function () {
  console.log('layout');
  return gulp.src(['./source/**/*.ejs', './source/**/*.html'])
    .pipe($.plumber())
    // .pipe($.changed('./public', { extension: '.html' }))
    .pipe($.frontMatter())
    .pipe($.layout(function (file) {
      return file.frontMatter
    }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('cleanExtra', function () {
  return gulp.src(['./public/**/*.ejs', './public/**/_*.html'])
    .pipe($.clean());
})

gulp.task('copy', function () {
  return gulp.src(['./source/**/*.js'])
    .pipe($.plumber())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass', function () {
  // PostCSS AutoPrefixer
  var processors = [
    autoprefixer({
      browsers: ['last 5 version'],
    })
  ];

  return gulp.src(['./source/stylesheets/**/*.sass', './source/stylesheets/**/*.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested',
      includePaths: ['./node_modules/bootstrap/scss/']
    })
      .on('error', $.sass.logError))
    .pipe($.postcss(processors))
    .pipe($.if(options.env === 'production', $.minifyCss())) // 假設開發環境則壓縮 CSS
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(browserSync.reload({
      stream: true
    }));;
});

gulp.task('imageMin', function () {
  return gulp.src('./source/images/*')
    .pipe($.if(options.env === 'production', $.imagemin()))
    .pipe(gulp.dest('./public/images'));
});

gulp.task('vendorJs', function () {
  return gulp.src([
      './node_modules/bootstrap/dist/js/bootstrap.bundle.js'
    ])
    .pipe($.order([
      'jquery.js',
      'bootstrap.js'
    ]))
    .pipe($.concat('vendor.js'))
    // .pipe($.if(options.env === 'production', $.uglify()))
    .pipe(gulp.dest('./public/javascripts'))
})

gulp.task('browserSync', function () {
  return browserSync.init({
    server: { baseDir: './public' },
    reloadDebounce: 2000
  })
});

gulp.task('deploy', function () {
  return gulp.src('./public/**/*')
    .pipe($.ghPages({
      remoteUrl: 'https://github.com/hexschool/vue3-exercise.git'
    }))
})

gulp.task('watch', function (done) {
  gulp.watch(['./source/**/*.ejs'], gulp.parallel('layout'));
  gulp.watch(['./source/stylesheets/**/*.sass', './source/stylesheets/**/*.scss'], gulp.parallel('sass'));
  // gulp.watch(['./source/**/*.jade'], ['jade']);
  gulp.watch(['./source/**/*.js'], gulp.parallel('copy'));
  done();
});

gulp.task(
  'default',
  gulp.series(
    'layout',
    'sass',
    'copy',
    'vendorJs',
    // 'browserSync',
    'imageMin',
    'cleanExtra',
    gulp.parallel('watch'),
    function(done) {
      browserSync.init({
        server: { baseDir: './public' },
        reloadDebounce: 2000,
      });

      gulp.watch(['./source/**/*.ejs'], gulp.series('layout'));
      gulp.watch(['./source/**/*.js'], gulp.parallel('copy'));


    }
  )
);
gulp.task(
  'build',
  gulp.series('clean', 'layout', 'sass', 'copy', 'vendorJs', 'imageMin', 'cleanExtra')
);

