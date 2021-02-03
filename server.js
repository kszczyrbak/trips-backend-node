const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/public'));

let username = process.env.MONGO_USERNAME
let password = process.env.MONGO_PASSWORD
let hostname = process.env.MONGO_HOSTNAME

let connectionString = `mongodb+srv://${username}:${password}>@${hostname}/test?retryWrites=true&w=majority`

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    user: username,
    pass: password
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'error'));
db.once('open', () => {
    console.log('Working')
})

routes = require('./routes')

app.use('/', routes)

app.listen(process.env.PORT || 5000);