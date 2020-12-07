/*
 * GET users listing.
 */
import express = require('express');
import mysql from "mysql";

const router = express.Router();

interface Image {
    id: number;
    name: string;
    caption: string;
    file: string;
}

interface Album {
    id: number;
    name: string;
}

router.get('/pics', (req: express.Request, res: express.Response) => {

    var album = req.query.album;
    var where = "";
    if (album != null && album != 'undefined') {
        where += "WHERE album_id=" + album;
    }
    var pics: Image[] = [];
    req.databaseConnection.query('SELECT * FROM `image` ' + where, function (err, rows, fields) {
        if (err) throw err
        for (let row of rows) {
            pics.push(row);
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ items: pics });
    })
});

router.get('/albums', (req: express.Request, res: express.Response) => {

    var albums: Album[] = [];
    req.databaseConnection.query('SELECT * FROM `album`', function (err, rows, fields) {
        if (err) throw err
        for (let row of rows) {
            albums.push(row);
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({ items: albums });
    })
});

export default router;
