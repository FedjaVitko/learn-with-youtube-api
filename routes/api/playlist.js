const express = require('express');
const router = express.Router();
const db = require('../../database');

router.get('/', function(req, res) {
    db.select().from('playlist').then(function(data) {
        res.send(data);
    })
});

module.exports = router;