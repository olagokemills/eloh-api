module.exports = (app) => {

    const item = require('../controllers/item.controller');

    //Get all items
    app.get('/api/items', verifyToken, item.findAll);

    app.get('/api/item/:id', item.findOne);

    app.post('/api/items', verifyToken, item.createItem);

    app.put('/api/item/update/:id', verifyToken, item.editItem);

    app.delete('/api/item/remove/:id',verifyToken, item.deleteItem);

    app.put('/api/items/verify/:id', verifyToken, item.verifyItem);


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