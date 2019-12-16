const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const _ = require('lodash');
mongoose.set('useCreateIndex', true);

const app = express();

//app.use(cors());
app.use(express.json())

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use(morgan('dev'));


//default route
app.get('/', (req, res) => {
    
    res.json({"message": "Welcome, human"})

})

//routes
require('./routes/index.js')(app);
//db connect
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true}, (res) =>
        console.log(res)
        // console.log('Connected!')
)


const PORT = process.env.PORT || 8080;
//port to listen to
app.listen(PORT, () => {
    console.log("Server is live on your desired port");
})
