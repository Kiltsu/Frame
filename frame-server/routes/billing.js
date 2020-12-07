"use strict";
exports.__esModule = true;
/*
 * GET users listing.
 */
var express = require("express");
var router = express.Router();
var Company = /** @class */ (function () {
    function Company() {
    }
    return Company;
}());
exports.Company = Company;
router.get('/company', function (req, res) {
    console.log(req.session);
    if (req.session.userId) {
        var id = req.query.id;
        var where = "";
        if (id != null && id != 'undefined') {
            where += "WHERE id=" + id;
        }
        req.databaseConnection.query('SELECT * FROM `company` ' + where, function (err, rows, fields) {
            if (err)
                throw err;
            var company = rows[0];
            res.json({
                company: company,
                error: false,
                message: "Success"
            });
        });
    }
    else {
        res.json({
            company: null,
            error: true,
            message: "No access allowed, please login"
        });
    }
});
exports["default"] = router;
