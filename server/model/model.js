const { Pool } = require('pg');
const dotenv = require('dotenv').config();
//not using dot.env for my feature because my.env files arent loading in currently
// const PG_URI='postgres://fadsabzn:s6yxZFZYB_qhcehpRT8TkmNkiram-Ouz@peanut.db.elephantsql.com/fadsabzn';

const pool = new Pool({
    connectionString: dotenv.PG_URI
})

module.exports = {
    query: (text, params, callback) => {
        console.log('successful query for: ', text);
        return pool.query(text, params, callback);
    }
}

