module.exports = (app) => {

    const bid = require('../controllers/bid.controller');

    //Get all items
    app.get('/api/bids', bid.findAll);

    app.get('/api/bid/:id', bid.findOne);

    app.post('/api/bid', bid.createBid);

    app.put('/api/bid/update/:id', bid.updateBid);

    app.delete('/api/bid/remove/:id', bid.deleteBid);

    app.put('/api/bids/verify/:id', bid.acceptBid);
}