const express = require('express');
const router = express.Router();

const playlistRoute = require('./courses');

router.use('/courses', playlistRoute);

module.exports = router;