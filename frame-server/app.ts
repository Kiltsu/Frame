import express = require('express');
import bodyParser = require('body-parser');

import gallery from './routes/gallery';
import cms from './routes/cms';
import index from './routes/index';
import billing from './routes/billing';
import authenticate from './routes/authenticate';

import mysql from "mysql";

import cookieSession from "cookie-session";

var app = express();

app.use(cookieSession({
    name: 'session',
    secret: 'uAZ7i0Lers',
    httpOnly: false,
    sameSite: 'lax',
    domain: 'localhost',
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

var connection = mysql.createConnection({
	host: 'localhost',
	//socketPath: '/var/run/mysqld/mysqld.sock',
	user: 'frame',
	password: '3ac2t7TATu',
	database: 'frame'
});

connection.connect();

app.use('/auth', (req: express.Request, res: express.Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/', (req: express.Request, res: express.Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/', (req: express.Request, res: express.Response, next) => {
    req.databaseConnection = connection;
    next();
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true,
	type: "application/x-www-form-urlencoded"
})); 

// routes

app.use(express.static(__dirname));

app.use('/auth', authenticate);
app.use('/gallery', gallery);
app.use('/cms', cms);
app.use('/billing', billing);
app.use('/', index);

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
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stack traces
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            error: {}
        }
    });
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function () {
    
});
