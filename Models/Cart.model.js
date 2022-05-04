const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    idCustomer: { type: 'string', required: true },
    idProduct: { type: 'string', required: true },
    amount: { type: 'number', defaultsTo: 0 },
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
