const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

app.use(fileUpload({
    createParentPath:true
}))
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




app.post('/upload', async (req, res) => {
             try{
                if(!req.files){
                    res.send({
                        status: false,
                        message: 'No file here'
                    })
                }else{
                    let avatar = req.files.avatar;
    
                    avatar.mv('./uploads/' + avatar.name);
                    res.send({
                        status: true,
                        message:'File has been seen',
                        data:{
                            name: avatar.name,
                            mimetype: avatar.mimetype,
                            size:avatar.size
                        }
                    });
                }
            }catch(err){
                res.status(500).send(err);
            }
        })


//routes
require('./routes/user.route')(app);
require('./routes/item.route')(app);
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