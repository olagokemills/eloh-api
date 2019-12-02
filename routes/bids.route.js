const bid = require('../controllers/bid.controller');
const check = require('../utils/verifyToken');
const verify = require('../utils/verify');
const del = require('../controllers/delete.controller')

module.exports = (app) => {

    //Get all items
    app.get('/api/bids', [check, verify], bid.findAll);

    app.get('/api/bid/:id', [check, verify], bid.findOne);

    app.get('/api/bid/getUserBid/:id', [check, verify], bid.findByUserId);

    app.get('/api/bid/getItemId/:id', [check, verify], bid.findByItemId);

    app.post('/api/bid', [check, verify], bid.createBid);

    app.put('/api/bid/update/:id', [check, verify], bid.updateBid);

    app.delete('/api/bid/remove/:id',[check, verify], bid.deleteBid);

    app.put('/api/bids/verify/:id',[check, verify], bid.acceptBid);

}