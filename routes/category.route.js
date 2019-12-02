
const category = require('../controllers/category.controller');
const check = require('../utils/verifyToken');
const verify = require('../utils/verify');
const admin = require('../utils/admin')

module.exports = (app) => {

    //Get all items
    app.get('/api/categories', category.findAll);

    app.get('/api/categories/:id',  category.findOne);

    app.post('/api/categories', [check, verify], category.createCategory);

    app.put('/api/item/update/:id', [check, verify], category.editCategory);

    app.delete('/api/item/remove/:id',[check, verify], category.deleteCategory);

}