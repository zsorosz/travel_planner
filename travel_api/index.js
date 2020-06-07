const express = require('express');
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.json({message: "Hello from the root route"})
})

app.listen(port, () => {
    console.log("App is running on port " + port);
    
})