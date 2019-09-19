const express = require('express');
const bodyParser = require('body-parser')

const app = express();


//Parse requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome, human"})
})


//post to