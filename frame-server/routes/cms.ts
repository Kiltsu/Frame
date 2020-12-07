import express = require('express');
const router = express.Router();
import { Page } from '../../frame-core/src/page';
import { Company } from '../../frame-core/src/company';

import mysql from "mysql";

router.get('/', (req: express.Request, res: express.Response) => {
	res.redirect('../');
});

router.get('/page', (req: express.Request, res: express.Response) => {

    var pageId = req.query.id;
    var query = 'SELECT * FROM ?? WHERE ??=?';
    var queryParams = ["page", "id", pageId];
    query = mysql.format(query, queryParams);
    req.databaseConnection.query(query, function (err, rows, fields) {
        if (err) throw err;
        var page: Page = rows[0];
        res.json({
            page: page,
            error: false,
            message: "Success"
        });
    })
});

router.post('/save', (req: express.Request, res: express.Response) => {

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
			if (err) throw err;
			var page: Page = rows[0];
			res.json({
				page: page,
				error: false,
				message: "Success"
			});
		})
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

router.get('/pages', (req: express.Request, res: express.Response) => {

	var query = 'SELECT * FROM ??';
	var queryParams = ["page"];
	query = mysql.format(query, queryParams);
	req.databaseConnection.query(query, function (err, rows, fields) {
		if (err) throw err;
		res.json({
			pages: rows,
			error: false,
			message: "Success"
		});
	})
});

router.get('/about', (req: express.Request, res: express.Response) => {

	var pageId = req.query.id;
	var query = 'SELECT * FROM ?? WHERE ??=?';
	var queryParams = ["company", "id", "1"];
	query = mysql.format(query, queryParams);
	req.databaseConnection.query(query, function (err, rows, fields) {
		if (err) throw err;
		var page: Page = rows[0];
		res.json({
			page: page,
			error: false,
			message: "Success"
		});
	})
});

export default router;
