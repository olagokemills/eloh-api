module.exports = (app) => {

    const users = require('../controllers/user.controller');

    //Get all users
    app.get('/api/users', users.findAll);
    
}