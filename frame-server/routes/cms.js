"use strict";
exports.__esModule = true;
var express = require("express");
var router = express.Router();
var mysql = require('mysql');
router.get('/', function (req, res) {
    res.redirect('../');
});
router.get('/page', function (req, res) {
    var pageId = req.query.id;
    var query = 'SELECT * FROM ?? WHERE ??=?';
    var queryParams = ["page", "id", pageId];
    query = mysql.format(query, queryParams);
    req.databaseConnection.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        var page = rows[0];
        res.json({
            page: page,
            error: false,
            message: "Success"
        });
    });
});
router.post('/save', function (req, res) {
    console.log("Save page called");
    var description = req.body.description;
    var name = req.body.name;
    var header = req.body.header;
    var id = req.body.id;
    console.log("Page save " + req.body.id);
    if (id) {
        var query = 'UPDATE ?? SET ??=?, ??=?, ??=? WHERE ??=?';
        var queryParams = ["page", "name", name, "header", header, "description", description, "id", id];
        query = mysql.format(query, queryParams);
        req.databaseConnection.query(query, function (err, rows, fields) {
            if (err)
                throw err;
            var page = rows[0];
            res.json({
                page: page,
                error: false,
                message: "Success"
            });
        });
    }
    /*var query = 'INSERT INTO ?? ( ?? ) VALUES ( ?)';
    var queryParams = ["page", "description", description];
    query = mysql.format(query, queryParams);
    req.databaseConnection.query(query, function (err, rows, fields) {
        if (err) throw err;
        var page: Page = rows[0];
        res.json({
            page: page,
            error: false,
            message: "Success"
        });
    })*/
});
router.get('/pages', function (req, res) {
    var query = 'SELECT * FROM ??';
    var queryParams = ["page"];
    query = mysql.format(query, queryParams);
    req.databaseConnection.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        res.json({
            pages: rows,
            error: false,
            message: "Success"
        });
    });
});
router.get('/about', function (req, res) {
    var pageId = req.query.id;
    var query = 'SELECT * FROM ?? WHERE ??=?';
    var queryParams = ["company", "id", "1"];
    query = mysql.format(query, queryParams);
    req.databaseConnection.query(query, function (err, rows, fields) {
        if (err)
            throw err;
        var page = rows[0];
        res.json({
            page: page,
            error: false,
            message: "Success"
        });
    });
});
exports["default"] = router;
