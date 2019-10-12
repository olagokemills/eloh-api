module.exports = (app) => {

    const bid = require('../controllers/bid.controller');

    //Get all items
    app.get('/api/bids', bid.findAll);

    app.post('/api/bid', bid.createBid);

    app.put('/api/bid/update/:id', bid.editItem);

    app.delete('/api/bid/remove/:id', bid.deleteItem);

    //app.put('/api/bids/verify/:id', bid.verifyItem);
}