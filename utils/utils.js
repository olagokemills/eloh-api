module.exports = (app) => {

  const config = require('../config/config');
  const jwt = require('jsonwebtoken');

app.post('/api/posts', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
      }
    });
  });


// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

  


  app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
      id: 1, 
      username: 'brad',
      email: 'brad@gmail.com'
    }
  
    jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
      res.json({
        token
      });
    });
  });
 
  

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
                   size:avatar.size,
                   path: avatar.tempFilePath
               }
           });
           
       }
   }catch(err){
       res.status(500).send(err);
   }
})

}