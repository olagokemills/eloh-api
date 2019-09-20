module.exports = (app) => {

    const users = require('../controllers/user.controller');

    //Get all users
    app.get('/api/users', verifyToken, users.findAll);

    //Get specific user
    app.get('/api/user/:userId', verifyToken, users.findOne);

    //Create User
    app.post('/api/users/', users.createUser);

    //User signIn
    app.post('/api/user/signin', users.signIn);



    // Verify Token
    function verifyToken(req, res, next){
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



}