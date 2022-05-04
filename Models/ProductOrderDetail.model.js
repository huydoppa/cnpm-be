const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductOrderDetailSchema = new Schema({
    idProductOrder: { type: 'string', required: true },
    idProduct: { type: 'string', required: true },
    name: { type: 'string', required: true },
    price: { type: 'number', required: true },
    promoPrice: { type: 'number', required: true },
    amount: { type: 'number', required: true},
});

const ProductOrderDetail = mongoose.model("ProductOrderDetail", ProductOrderDetailSchema);
module.exports = ProductOrderDetail;
