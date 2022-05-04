const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    idCustomer: { type: 'string', unique: true, default: 1 },
    phone: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    name: { type: 'string' },
    email: { type: 'string' },
    avatar: { type: 'string' },
    address: { type: 'string' },
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
