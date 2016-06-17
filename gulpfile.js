var gulp = require('gulp'), less = require('gulp-less');

gulp.task('build-less', function(){
    gulp.src('./less/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('./css/bootstrap'));

    gulp.src('./less/styles.less')
        .pipe(less())
        .pipe(gulp.dest('./css/'));
});

gulp.task('copy-npm-files', function () {
    //Javascripts
    gulp.src('node_modules/core-js/client/shim.min.js')
        .pipe(gulp.dest('vendor/core-js/client/'));
    
    gulp.src('node_modules/zone.js/dist/zone.js')
        .pipe(gulp.dest('vendor/zone.js/dist/'));

    gulp.src('node_modules/reflect-metadata/Reflect.js')
        .pipe(gulp.dest('vendor/reflect-metadata//'));

    gulp.src('node_modules/systemjs/dist/system.src.js')
        .pipe(gulp.dest('vendor/systemjs/dist/'));

    gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('vendor/bootstrap/dist/js/'));
        
    // gulp.src(['node_modules/@angular/**/*'])
    //     .pipe(gulp.dest('vendor/@angular'));

    // gulp.src(['node_modules/rxjs/**/*'])
    //     .pipe(gulp.dest('vendor/rxjs'));

    //Bootstrap Assets
    gulp.src(['node_modules/bootstrap/dist/fonts/**/*'])
        .pipe(gulp.dest('css/fonts'));
});

gulp.task('watch-less', function () {
    gulp.watch('./less/**/*.less', ['build-less']);
});