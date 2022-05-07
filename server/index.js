require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000

var mysql = require('mysql');

var con = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

// We are using our packages here
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(cors())

//You can use this to check if your server is working
app.get('/', (req, res) => {
    res.send("Welcome to your server")
})


//Route that handles login logic
app.post('/submit', (req, res) => {

    console.log("Connected!");
    var sql = "UPDATE characterdb SET f_val = 1 + f_val WHERE charName = '" + req.body.fuck + "'";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
    var sql = "UPDATE characterdb SET m_val = 1 + m_val WHERE charName = '" + req.body.marry + "'";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });

    var sql = "UPDATE characterdb SET k_val = 1 + k_val WHERE charName = '" + req.body.kill + "'";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });

    res.redirect('back')
})

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");

})

//Route that handles signup logic
app.post('/signup', (req, res) => {
    console.log(req.body.fullname)
    console.log(req.body.username)
    console.log(req.body.password)
})

//Start your server on a specified port
app.listen(process.env.PORT || port, () => {
    console.log(`Server is runing on port ${port}`)
})