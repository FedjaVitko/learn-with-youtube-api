const express = require('express');
const router = express.Router();
const db = require('../../database');

router.get('/', function(req, res) {
    db.select().from('playlist').orderBy('id').then(function(data) {
        res.send(data);
    })
});

router.post('/', function(req, res) {
    db.insert(req.body).returning('*').into('playlist').then(function(data) {
        res.send(data);
    })
})

router.patch('/:id', function(req, res) {
    db('playlist').where({ id: req.params.id }).update(req.body).return('*').then(function(data) {
        res.send(data);
    });
})

router.put('/:id', function(req, res) {
    db('playlist').where({ id: req.params.id }).update({
        title: req.body.title || null,
        url: req.body.url || null
    }).return('*').then(function(data) {
        res.send(data);
    });
})

router.delete('/:id', function(req, res) {
    db('playlist').where({ id: req.params.id }).del().then(function() {
        req.json({ success: true })
    })
})

router.get('/:id', function(req, res) {
    db('playlist').where({ id: req.params.id }).select().then(function(data) {
        res.send(data);
    })
})

module.exports = router;