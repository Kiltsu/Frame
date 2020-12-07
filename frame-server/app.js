"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var gallery_1 = require("./routes/gallery");
var cms_1 = require("./routes/cms");
var index_1 = require("./routes/index");
var billing_1 = require("./routes/billing");
var authenticate_1 = require("./routes/authenticate");
var cookieSession = require('cookie-session');
var app = express();
app.use(cookieSession({
    name: 'session',
    // keys: ['uAZ7i0Lers', '67B2EF6411C812'],
    secret: 'uAZ7i0Lers',
    httpOnly: false,
    sameSite: 'lax',
    domain: 'localhost',
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    //socketPath: '/var/run/mysqld/mysqld.sock',
    user: 'frame',
    password: '3ac2t7TATu',
    database: 'kilzeus'
});
connection.connect();
app.use('/auth', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    /*res.setHeader('Access-Control-Allow-Origin', 'http://' + req.hostname + req);
    res.setHeader('Access-Control-Allow-Origin', 'http://www.' + req.hostname);*/
    /*res.setHeader('Access-Control-Allow-Origin', 'http://apuseni.fi');
    res.setHeader('Access-Control-Allow-Origin', 'http://www.apuseni.fi');*/
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use('/', function (req, res, next) {
    /*res.setHeader('Access-Control-Allow-Origin', 'http://' + req.hostname);
    res.setHeader('Access-Control-Allow-Origin', 'http://www.' + req.hostname);*/
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use('/', function (req, res, next) {
    req.databaseConnection = connection;
    next();
});
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true,
    type: "application/x-www-form-urlencoded"
}));
// view engine setup
app.use(express.static(__dirname));
app.use('/auth', authenticate_1["default"]);
app.use('/gallery', gallery_1["default"]);
app.use('/cms', cms_1["default"]);
app.use('/billing', billing_1["default"]);
app.use('/', index_1["default"]);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            error: {}
        }
    });
});
app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function () {
});
