
const category = require('../controllers/category.controller');
const check = require('../utils/verifyToken');
const verify = require('../utils/verify');
const admin = require('../utils/admin')

module.exports = (app) => {

    //Get all items
    app.get('/api/categories', category.findAll);

    app.get('/api/categories/:id',  category.findOne);

    app.post('/api/categories', [check, verify], item.createItem);

    app.put('/api/item/update/:id', [check, verify], item.editItem);

    app.delete('/api/item/remove/:id',[check, verify], item.deleteItem);

    app.put('/api/items/verify/:id', [check, verify, admin], item.verifyItem);

}