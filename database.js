var pgp = require('pg-promise')();

const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'bsz',
    user: 'postgres',
    password: '' //Confirm posgres password
};
var db = pgp(dbConfig);

module.exports = db;
