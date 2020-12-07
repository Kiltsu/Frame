/*
 * GET users listing.
 */
import express = require('express');
import cookie = require('../models/request')
import cookieSession = require('cookie-session')
const router = express.Router();

export class Company {
    id: number;
    name: string;
    vatNumber: string;
    address: string;
    state: string;
    country: string;
    postNumber: number;
}

router.get('/company', (req: express.Request, res: express.Response) => {
    
    console.log(req.session);
    if (req.session.userId) {
        var id = req.query.id;
        var where = "";
        if (id != null && id != 'undefined') {
            where += "WHERE id=" + id;
        }
        req.databaseConnection.query('SELECT * FROM `company` ' + where, function (err, rows, fields) {
            if (err) throw err
            var company: Company = rows[0];
            res.json({
                company: company,
                error: false,
                message: "Success"
            });
        })
    } else {
        res.json({
            company: null,
            error: true,
            message: "No access allowed, please login"
        });
    }
});

export default router;