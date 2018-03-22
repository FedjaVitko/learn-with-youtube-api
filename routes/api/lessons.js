/**
 * External dependencies
 */
const express = require('express');
const fetch = require('node-fetch');
const { get } = require('lodash');

/**
 * Internal dependencies
 */
const db = require('../../database');

const router = express.Router();

router.get('/', function(req, res) {
  const playlistId = req.query.playlistId;

  let lessonIds = [];
  let lessonTitles = [];

  const lessons = [];

  fetch(
    'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=PLuNEz8XtB51K-x3bwCC9uNM_cxXaiCcRY&maxResults=50&key=AIzaSyB-ZbPeb6HgA2xpa9gay0PjrneFf1t0nFs'
  )
    .then(res => res.json())
    .then(body =>
      body.items.map(item => get(item, 'contentDetails.videoId', ''))
    )
    .then(playlistIds => {
      lessonIds = playlistIds;
      fetch(
        'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' +
          playlistIds.toString() +
          '&key=AIzaSyB-ZbPeb6HgA2xpa9gay0PjrneFf1t0nFs'
      )
        .then(res => res.json())
        .then(body => {
          lessonTitles = body.items.map(video => get(video, 'snippet.title'));
          for (let i = 0; i < lessonTitles.length; i++) {
            lessons.push({
              id: lessonIds[i],
              title: lessonTitles[i]
            });
          }
          res.send(lessons);
        });
    });
});

module.exports = router;
