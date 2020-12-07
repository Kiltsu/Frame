"use strict";
exports.__esModule = true;
/*
 * GET users listing.
 */
var express = require("express");
var router = express.Router();
var crypto = require('crypto');
var mysql = require('mysql');
router.get('/check', function (req, res) {
    var query = null;
    if (req.session.userId) {
        console.log("User id " + req.session.userId);
        query = 'SELECT * FROM ?? WHERE ??=?';
        var queryParams = ["user", "id", req.session.userId];
        query = mysql.format(query, queryParams);
    }
    if (query) {
        req.databaseConnection.query(query, function (err, rows, fields) {
            if (err) {
                res.json({
                    user: null,
                    error: true,
                    message: "Could not login"
                });
            }
            else {
                if (rows.length > 0) {
                    var loggedUser = rows[0];
                    req.session.userId = loggedUser.id;
                    res.json({
                        user: loggedUser,
                        error: false,
                        message: "Success"
                    });
                }
                else {
                    res.json({
                        user: null,
                        error: true,
                        message: "User not found"
                    });
                }
            }
        });
    }
    else {
        res.json({
            user: null,
            error: true,
            message: "Could not login"
        });
    }
});
router.get('/login', function (req, res) {
    var query = null;
    if (req.session.userId) {
        console.log("User id " + req.session.userId);
        query = 'SELECT * FROM ?? WHERE ??=?';
        var queryParams = ["user", "id", req.session.userId];
        query = mysql.format(query, queryParams);
    }
    else if (req.query) {
        var user = req.query.name;
        query = 'SELECT * FROM ?? WHERE ??=? AND ??=?';
        var hash = crypto.createHash('sha256');
        var token = hash.update(req.query.token);
        var queryParams = ["user", "name", user, "password", hash.digest('hex')];
        query = mysql.format(query, queryParams);
    }
    req.databaseConnection.query(query, function (err, rows, fields) {
        if (err) {
            res.json({
                user: null,
                error: true,
                message: "Could not login"
            });
        }
        else {
            if (rows.length > 0) {
                var loggedUser = rows[0];
                req.session.userId = loggedUser.id;
                res.json({
                    user: loggedUser,
                    error: false,
                    message: "Success"
                });
            }
            else {
                res.json({
                    user: null,
                    error: true,
                    message: "User not found"
                });
            }
        }
    });
});
router.get('/logout', function (req, res) {
    req.session = null;
    res.json({
        user: null,
        error: false,
        message: "Success"
    });
});
exports["default"] = router;
