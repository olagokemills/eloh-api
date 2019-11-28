
const item = require('../controllers/item.controller');
const check = require('../utils/verifyToken');
const verify = require('../utils/verify');
const admin = require('../utils/admin')

module.exports = (app) => {

    //Get all items
    app.get('/api/items', item.findAll);

    app.get('/api/item/:id',  item.findOne);

    app.get('/api/items/getUserItem/:id', [check, verify], item.getByUserId)

    app.post('/api/items', [check, verify], item.createItem);

    app.get('/api/items/category/:cat', item.findCategory);

    app.put('/api/item/update/:id', [check, verify], item.editItem);

    app.delete('/api/item/remove/:id',[check, verify], item.deleteItem);

    app.put('/api/items/verify/:id', [check, verify, admin], item.verifyItem);

}