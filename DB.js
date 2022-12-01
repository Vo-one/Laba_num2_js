const db = require("mysql");

const conn = db.createConnection( {
        host: "localhost",
        user: "root",
        database: "user",
        password: ""
    }
);

conn.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("DB----OK");
    }
})

module.exports = conn;