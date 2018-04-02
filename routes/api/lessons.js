/**
 * External dependencies
 */
const express = require('express');
const fetch = require('node-fetch');
const { get } = require('lodash');

/**
 * Internal dependencies
 */
// const db = require('../../database');

const router = express.Router();

router.get('/', function(req, res) {
  const playlistId = req.query.playlistId;

  let lessonIds = [];
  let lessonsInfo = [];

  const lessons = [];

  const playlistItemsUrl =
    'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=' +
    playlistId +
    '&maxResults=50' +
    '&key=' +
    process.env.API_KEY;

  fetch(playlistItemsUrl.slice(0, -2))
    .then(res => res.json())
    .then(body =>
      body.items.map(item => get(item, 'contentDetails.videoId', ''))
    )
    .then(playlistIds => {
      lessonIds = playlistIds;
      const videosUrl =
        'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=' +
        playlistIds.toString() +
        '&key=' +
        process.env.API_KEY;
      fetch(videosUrl.slice(0, -2))
        .then(res => res.json())
        .then(body => {
          lessonsInfo = body.items.map(video => ({
            title: video.snippet.title,
            duration: video.contentDetails.duration
          }));
          for (let i = 0; i < lessonsInfo.length; i++) {
            lessons.push({
              id: lessonIds[i],
              info: lessonsInfo[i]
            });
          }
          res.send(lessons);
        });
    });
});

module.exports = router;
