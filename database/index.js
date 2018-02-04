const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        database: 'learn_with_youtube_db'
    }
});

module.exports = knex;

