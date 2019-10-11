module.exports = (app) => {

    const item = require('../controllers/item.controller');

    //Get all items
    app.get('/api/items', item.findAll);

    app.post('/api/items', item.createItem);

    app.put('/api/item/update/:id', item.editItem);

    app.delete('/api/item/remove/:id', item.deleteItem);

    app.put('/api/items/verify/:id', item.verifyItem);
}