module.exports = (app) => {

    const item = require('../controllers/item.controller');

    //Get all items
    app.get('/api/items', item.findAll);

    app.post('/api/items', item.createItem);

    app.put('/api/items', item.editItem);

    app.delete('/api/items', item.deleteItem);

    app.put('/api/items', item.verifyItem);
}