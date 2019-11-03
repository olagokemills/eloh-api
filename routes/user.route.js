module.exports = (app) => {

    const users = require('../controllers/user.controller');
    const verify =require('../utils/verifyToken');

    //Get all users
    app.get('/api/users',verify, users.findAll);

    //Get specific user
    // app.get('/api/user/:userId', verifyToken, users.findOne);

    //Create User
    app.post('/api/users/', users.createUser);

    // //User signIn
    // app.post('/api/user/signin', users.signIn);

    // //Delete User
    // app.delete('/api/user/remove/:id', verifyToken, users.deleteUser);

    // //Update User
    // app.put('/api/user/update/:userId', verifyToken, users.updateUser);



}