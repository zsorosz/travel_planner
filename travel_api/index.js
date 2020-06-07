const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
    res.sendFile('index.html')
})

app.listen(port, () => {
    console.log("App is running on port " + port);
    
})