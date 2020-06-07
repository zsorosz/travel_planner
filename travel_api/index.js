const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
    res.json({message: "Hello from the root route"})
})

app.listen(port, () => {
    console.log("App is running on port " + port);
    
})