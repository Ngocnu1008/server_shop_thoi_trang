require("dotenv").config();

const pgp = require("pg-promise")();

const connect = `postgres://${process.env.DB_NAME}:${process.env.DB_PW}@localhost:5432/study`

const db = pgp(connect);

db.connect()
    .then(() => console.log("connect db sucessfully"))
    .catch((err) => console.error(err));
    
module.exports = db;