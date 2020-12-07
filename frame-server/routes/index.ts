/*
 * GET home page.
 */
import express = require('express');
import path = require('path');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

export default router;