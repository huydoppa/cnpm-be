const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductOrderSchema = new Schema({
    idProductOrder: { type: 'string', required: true },
    idCustomer: { type: 'string', required: true },
    name: { type: 'string', required: true },
    phone: { type: 'string', required: true },
    address: { type: 'string', required: true },
    totalPrice: { type: 'number', required: true },
    status: { type: 'string', isIn: ['pending', 'delivered', 'cancel'] },
});

const ProductOrder = mongoose.model("ProductOrder", ProductOrderSchema);
module.exports = ProductOrder;
