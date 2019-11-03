module.exports = (app) => {

    const item = require('../controllers/item.controller');
    const verify = require('../utils/verifyToken');
    const admin = require('../utils/admin');

    //Get all items
    app.get('/api/items', verify, item.findAll);

    app.get('/api/item/:id', item.findOne);

    app.post('/api/items', verify, item.createItem);

    app.put('/api/item/update/:id', verify, item.editItem);

    app.delete('/api/item/remove/:id',verify, item.deleteItem);

    app.put('/api/items/verify/:id', verify, item.verifyItem);

}