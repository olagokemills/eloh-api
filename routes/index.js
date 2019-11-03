module.exports = (app) => {
require('./user.route')(app);
require('./item.route')(app);
require('./bids.route')(app);

}