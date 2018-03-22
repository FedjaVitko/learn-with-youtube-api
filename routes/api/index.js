/**
 * External dependencies
 */
const express = require('express');
const router = express.Router();

/**
 * Internal dependencies
 */
const coursesRoute = require('./courses');
const lessonsRoute = require('./lessons');

router.use('/courses', coursesRoute);
router.use('/lessons', lessonsRoute);

module.exports = router;
