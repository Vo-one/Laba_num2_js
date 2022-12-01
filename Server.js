const express = require("express");
const multer  = require("multer");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SessionStore = require('express-mysql-session');
const conn = require("./db");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());

const options = {
    host: "localhost",
    user: "root",
    database: "user",
    password: ""
};

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new SessionStore(options),
    resave: true,
    saveUninitialized: true
}))


app.use(express.static(__dirname));
const storageConfig = multer.diskStorage( {
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
app.use(multer({storage:storageConfig}).single("filedata"));


app.post("/set_com", function (req, res) {

    var name=req.body.n;
    var com=req.body.com;
    var mark =req.body.sel;


    console.log(name);
    var sql = "INSERT INTO com (name, com, mark) VALUES ('"+name+"', '"+com+"','"+mark+"')";
    conn.query(sql, function (err) { if (err) throw err;});

    conn.query("update files set col  = col + 1 WHERE name=?",name, function(err, rows){
        if (err){
            console.log(err);
            return;
        }});

    res.redirect('/count.html?' + name);
});


app.post("/set_file", function (req, res) {

    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else {
        var name = filedata.originalname;
        var col = 0;

        var sql = "INSERT INTO files (name, col) VALUES ('" + name + "', '" + col  + "')";
        conn.query(sql, function (err) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        res.redirect('/index.html');
    }
});


app.get('/get_com/:filcode', function(req, res) {

    conn.query("SELECT name, com, mark FROM com WHERE name =?",req.params.filcode,  function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.end(JSON.stringify(rows));
    });
});


app.get('/gen',  function(req, res) {
    conn.query("SELECT name, col FROM files ORDER BY col",  function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(rows);

        let m = [{
            name: rows[0].name,
            col: rows[0].col,
        }, {
            name: rows[1].name,
            col: rows[1].col,

        },{
            name: rows[2].name,
            col: rows[2].col,
        }];

        res.end(JSON.stringify(m));
    });
});

app.get('/',  function(req, res) {
    res.redirect('/index.html');
});

app.listen(3000, () => console.log("open: http://localhost:3000"));