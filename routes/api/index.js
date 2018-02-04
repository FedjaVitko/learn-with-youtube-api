const express = require('express');
const router = express.Router();

const playlistRoute = require('./playlist');

router.use('/playlist', playlistRoute);

module.exports = router;