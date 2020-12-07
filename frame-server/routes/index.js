"use strict";
exports.__esModule = true;
/*
 * GET home page.
 */
var express = require("express");
var path = require("path");
var router = express.Router();
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});
exports["default"] = router;
