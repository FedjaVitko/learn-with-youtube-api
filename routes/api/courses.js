/**
 * External dependencies
 */
const express = require('express');
const fetch = require('node-fetch');

/**
 * Internal dependencies
 */
const db = require('../../database');

const router = express.Router();

router.get('/', function(req, res) {
  const queryString = req.query.searchTerm;
  db
    .select()
    .from('courses')
    .whereRaw(`array_to_string(tags, ', ') like '%${queryString}%'`)
    .orderBy('id')
    .then(data => {
      res.send(data);
    });
  // db.select('name')
  //     .from('tags')
  //     .orderBy('id')
  //     .then((data) => {
  //         const tags = [];
  //         data.forEach(tag => tags.push(tag.name))
  //         db.select()
  //             .from('courses')
  //             .whereIn('Node.js', tags)
  //             .orderBy('id')
  //             .then(data => {
  //                 res.send(data);
  //             })
  //     })
});

router.post('/', function(req, res) {
  const playlistId = req.body.url.slice(-34);
  fetch(
    `https://www.googleapis.com/youtube/v3/playlists?
        part=snippet%2C+contentDetails&
        id=${playlistId}&
        key=${process.env.API_KEY}`
  )
    .then(res => res.json())
    .then(body => {
      const snippet = body.items[0].snippet;
      const contentDetails = body.items[0].contentDetails;

      const course = {
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.medium.url,
        channel_title: snippet.channelTitle,
        channel_id: snippet.channelId,
        published_at: snippet.publishedAt,
        difficulty: req.body.difficulty,
        rating: req.body.rating,
        lang: req.body.lang,
        lessons_count: contentDetails.itemCount,
        tags: req.body.tags,
        playlist_id: playlistId
      };

      db
        .insert(course)
        .returning('*')
        .into('courses')
        .then(data => {
          res.send(data);
        });
    });
});

router.patch('/:id', function(req, res) {
  db('courses')
    .where({ id: req.params.id })
    .update(req.body)
    .return('*')
    .then(function(data) {
      res.send(data);
    });
});

router.put('/:id', function(req, res) {
  db('courses')
    .where({ id: req.params.id })
    .update({
      title: req.body.title || null,
      url: req.body.url || null
    })
    .return('*')
    .then(function(data) {
      res.send(data);
    });
});

router.delete('/:id', function(req, res) {
  db('courses')
    .where({ id: req.params.id })
    .del()
    .then(function() {
      res.json({ success: true });
    });
});

router.get('/:id', function(req, res) {
  db('courses')
    .where({ id: req.params.id })
    .select()
    .then(function(data) {
      res.send(data);
    });
});

module.exports = router;
