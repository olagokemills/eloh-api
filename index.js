const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const app = express();


const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'Customer API',
            description: 'Customer API Information',
            contact:{
                name:"Olagoke"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis:["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(fileUpload({
    createParentPath:true,
    limits: { fileSize: 50 * 1024 * 1024 },
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

//routes
require('./routes/index.js')(app);
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