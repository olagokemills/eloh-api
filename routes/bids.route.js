const bid = require('../controllers/bid.controller');
const check = require('../utils/verifyToken');
const verify = require('../utils/verify');

module.exports = (app) => {

    //Get all items
    app.get('/api/bids',[check, verify], bid.findAll);

    app.get('/api/bid/:id', [check, verify], bid.findOne);

    app.post('/api/bid', [check, verify], bid.createBid);

    app.put('/api/bid/update/:id', [check, verify], bid.updateBid);

    app.delete('/api/bid/remove/:id',[check, verify], bid.deleteBid);

    // app.put('/api/bids/verify/:id',[check, verify], bid.acceptBid);
}