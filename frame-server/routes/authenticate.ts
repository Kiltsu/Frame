import express = require('express');
import crypto from "crypto";

import mysql from "mysql";

const router = express.Router();

interface User {
    id: number;
    name: string;
    token: string;
}

router.get('/check', (req: express.Request, res: express.Response) => {
    var query = null;
    if (req.session.userId) {
        console.log("User id " + req.session.userId);
        query = 'SELECT * FROM ?? WHERE ??=?';
        var queryParams = ["user", "id", req.session.userId];
        query = mysql.format(query, queryParams);
    }
    if(query) {
        req.databaseConnection.query(query, function (err, rows, fields) {
            if (err) {
                res.json({
                    user: null,
                    error: true,
                    message: "Could not login"
                });
            } else {
                if (rows.length > 0) {
                    var loggedUser: User = rows[0];
                    req.session.userId = loggedUser.id;
                    res.json({
                        user: loggedUser,
                        error: false,
                        message: "Success"
                    });
                } else {
                    res.json({
                        user: null,
                        error: true,
                        message: "User not found"
                    });
                }
            }
        });
    } else {
        res.json({
            user: null,
            error: true,
            message: "Could not login"
        });
    }
});

router.get('/login', (req: express.Request, res: express.Response) => {
    var query = null;
    if (req.session.userId) {
        console.log("User id " + req.session.userId);
        query = 'SELECT * FROM ?? WHERE ??=?';
        var queryParams = ["user", "id", req.session.userId];
        query = mysql.format(query, queryParams);
    } else if (req.query) {
        var user = req.query.name;
        query = 'SELECT * FROM ?? WHERE ??=? AND ??=?';
        const hash = crypto.createHash('sha256');
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
        } else {
            if (rows.length > 0) {
                var loggedUser: User = rows[0];
                req.session.userId = loggedUser.id;
                res.json({
                    user: loggedUser,
                    error: false,
                    message: "Success"
                });
            } else {
                res.json({
                    user: null,
                    error: true,
                    message: "User not found"
                });
            }
        }
    })
});

router.get('/logout', (req: express.Request, res: express.Response) => {
    req.session = null;
    res.json({
        user: null,
        error: false,
        message: "Success"
    });
});

export default router;
