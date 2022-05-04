const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceOrderSchema = new Schema({
    idServiceOrder: { type: 'string', required: true },
    idCustomer: { type: 'string', required: true },
    nameService: { type: 'string', required: true },
    nameCustomer: { type: 'string', required: true },
    address: { type: 'string', required: true },
    time: { type: 'ref', columnType: 'datetime' },
    price: { type: 'number', required: true },
    promoPrice: { type: 'number', required: true },
});

const ServiceOrder = mongoose.model("ServiceOrder", ServiceOrderSchema);
module.exports = ServiceOrder;
