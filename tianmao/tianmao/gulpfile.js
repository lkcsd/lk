var gulp = require('gulp');
var load = require('gulp-load-plugins')();
var browser = require('browser-sync').create();


gulp.task('js',function(done){
	gulp.src("./src/js/*")
	.pipe(load.babel({
		"presets":['@babel/env']
	}))
	.pipe(load.uglify())
	.pipe(gulp.dest('./dist/js/'))
	done()
})

gulp.task('css',function(done){
	gulp.src('./src/css/*.css')
	.pipe(load.minifyCss())
	.pipe(gulp.dest('./dist/css/'))
	done()
})

gulp.task('scss',function(done){
	gulp.src('./src/css/*.scss')
	.pipe(load.sass())
	.pipe(load.minifyCss())
	.pipe(load.rename('index.min.css'))
	.pipe(gulp.dest('./dist/css/'))
	done()
})

gulp.task('html',function(done){
	gulp.src('./src/*.html')
	.pipe(load.minifyHtml())
	.pipe(gulp.dest('./dist/'))
	done()
})

gulp.task('img',function(done){
	gulp.src('./src/img/*')
	// .pipe(load.imagemin())
	.pipe(gulp.dest('./dist/img/'))
	done()
})

gulp.task('font',function(done){
	gulp.src('./src/font/*')
	.pipe(gulp.dest('./dist/font/'))
	done()
})

gulp.task('server',gulp.series(gulp.parallel('html','css','scss','js','font','img'),function(done){

	browser.init({
		server:'./dist/',
		port:8080
	})

	gulp.watch('./src/',gulp.series(gulp.parallel('html','css','scss','js','font','img'),function(done){
		browser.reload()
		done()
	}))
	
	done()
}))
