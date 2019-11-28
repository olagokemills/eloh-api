
const favourites = require('../controllers/favourites.controller');
const check = require('../utils/verifyToken');
const verify = require('../utils/verify');
const admin = require('../utils/admin')

module.exports = (app) => {

    //Get all items
    app.get('/api/favourites', [check, verify, admin], favourites.findAll);

    app.get('/api/favourites/:id', [check, verify], favourites.findUserFav);

    app.post('/api/favourites', [check, verify], favourites.createFav);

    app.delete('/api/favourites/remove/:id',[check, verify], favourites.deleteFav);

}