const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const _ = require('lodash');
mongoose.set('useCreateIndex', true);
const app = express();

// app.use(fileUpload({
//     createParentPath:true,
//     limits: { fileSize: 50 * 1024 * 1024 },
// }))
//cors request
app.use(cors());
//Parse requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('dev'));



//default route
app.get('/', (req, res) => {
    
    res.json({"message": "Welcome, human"})

})



//routes
require('./routes/index.js')(app);
//db connect
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log('Connected!')
)


const PORT = process.env.PORT || 8080;
//port to listen to
app.listen(PORT, () => {
    console.log("Server is live on your desired port");
})
