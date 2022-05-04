const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    idProduct: { type: 'string', required: true},
    name: { type: 'string', required: true },
    image: { type: 'string', required: true },
    price: { type: 'number', required: true },
    promoPrice: { type: 'number', default: 0 },
    amount: { type: 'number', default: 100 },
    description: { type: 'string' },
    type: { type: 'string', required: true },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
