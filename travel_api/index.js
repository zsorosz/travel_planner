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
const plansRoutes = require('./routes/plans');

app.use('/api/users', userRoutes);
app.use("/api/users/:id/plans", plansRoutes);

app.get("/", (req, res) => {
    res.sendFile('index.html')
})

const b_port = process.env.PORT || port;
app.listen(b_port, () => {
    console.log("App is running on port " + b_port);
    
})

const path = require('path')

// Serve static files from the React frontend app
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, '/../travel_frontend/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../travel_frontend/build/index.html'))
})
}