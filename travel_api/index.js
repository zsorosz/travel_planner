const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
    res.sendFile('index.html')
})

app.listen(port, () => {
    console.log("App is running on port " + port);
    
})