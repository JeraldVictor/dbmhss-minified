var createError = require('http-errors');
var express = require('express');
var path = require('path');


var allRouter = require('./routes/allroutes');
var image = require('./routes/imageupload');
var report = require('./routes/printing');
let students = require('./routes/students.js');
let teachers = require('./routes/teachers.js');


var app = express();

//bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstra


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', allRouter);
app.use('/pic-upload', image);
app.use('/report', report);
app.use('/students', students);
app.use('/teachers', teachers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
