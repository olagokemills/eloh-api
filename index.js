const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const mongoose = require('mongoose');




const app = express();

//cors request
app.use(cors());
//Parse requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome, human"})
})
//routes
require('./routes/user.route')(app);
//db connect
mongoose.connect(config.dbUrl, {
    useNewUrlParser: true
}).then(()=> {
    console.log('Connected to DB');
}).catch(err => {
    console.log('Connction failed');
    process.exit();
})


//port to listen to
app.listen(config.PORT, () => {
    console.log("Server is live on your desired port");
})