//Field's to be used 
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var uglyjs = require('gulp-uglify');
var uglycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var imgcompact = require('gulp-imagemin');
var pug = require('gulp-pug'); 


gulp.task('greet', function()
{
    console.log("Learn something!");
});

gulp.task('image',function()
{
    return gulp.src('dev/images/*')
    .pipe(plumber())
    .pipe(imgcompact())
    .pipe(gulp.dest('images/'));
});



//Generate the style 
gulp.task("style",function()
{
    return gulp.src('dev/style/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./'))
 

});


// Convert the albert js files into 1 
gulp.task("albertjs",function()
{
    //Combine everything into one file
    return gulp.src('dev/albertjs/*.js')
    .pipe(plumber())
    .pipe(uglyjs()) // shrink your file size
    .pipe(concat('albert.js')) //combine
    .pipe(gulp.dest('./js'));
 
});
//Create the html site 
gulp.task("site", function() 
{
    //Convert Pug to html  
    return gulp.src('dev/site/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./'));

});
//Watch Task 
gulp.task("watch",function()
{
    //Handle the Sass Task
    gulp.watch('dev/style/style.scss',['style']);
    //Handle the main  albert.js code 
    gulp.watch('dev/albertjs/*.js',['albertjs']);
    // Convert Pug to a Html Site 
    gulp.watch('dev/site/*.pug',['site']);

    //Do images optmizing  on the fly 
    gulp.watch('dev/images/*',['image']);
});




//Default task that runs 
gulp.task('default',['greet','image','albertjs','style','site','watch']);