"use strict";
exports.__esModule = true;
/*
 * GET users listing.
 */
var express = require("express");
var router = express.Router();
var mysql = require('mysql');
router.get('/pics', function (req, res) {
    var album = req.query.album;
    var where = "";
    if (album != null && album != 'undefined') {
        where += "WHERE album_id=" + album;
    }
    var pics = [];
    req.databaseConnection.query('SELECT * FROM `image` ' + where, function (err, rows, fields) {
        if (err)
            throw err;
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            pics.push(row);
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ items: pics });
    });
});
router.get('/albums', function (req, res) {
    var albums = [];
    req.databaseConnection.query('SELECT * FROM `album`', function (err, rows, fields) {
        if (err)
            throw err;
        for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
            var row = rows_2[_i];
            albums.push(row);
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ items: albums });
    });
});
exports["default"] = router;
