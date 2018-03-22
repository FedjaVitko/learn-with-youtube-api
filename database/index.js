const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5433,
        user: 'postgres',
        password: 'fedor1349',
        database: 'learn_with_youtube'
    }
});

module.exports = knex;

