const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { Model } = require('./model')

const port = 3000



let model = new Model();

//let control = new Controller(model)
// We are using our packages here
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(cors())

//You can use this to check if your server is working
app.get('/', (req, res) => {

    console.log("HELLO!");

    res.json({ "character": "Lumine" });

})


//Route that handles login logic
app.post('/submit', (req, res) => {

    //    control.sendRound(req.body.fuck, req.body.marry, req.body.kill);
    console.log("HELLO!");







})


app.get('/resp', (req, res) => {

    console.log("HELLO!");

    (async() => {

        console.log("Entered Async")

        const resp = await model.test();
        console.log("Finished Processing")
        console.log(resp);
        res.json(resp);
    })();





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