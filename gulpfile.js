var gulp = require("gulp"),
    browserSync = require('browser-sync');

// Запуск сервера
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'src'
    }
  });
});

// слежка
gulp.task('watch', function () {
  gulp.watch([
    'src/*.html',
    'src/js/**/*.js',
    'src/css/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'watch']);
