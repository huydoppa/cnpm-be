const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    idService: { type: 'string', required: true, unique: true},
    name: { type: 'string', required: true },
    image: { type: 'string', required: true },
    price: { type: 'number', required: true },
    promoPrice: { type: 'number', defaultsTo: 0 },
    supplier: { type: 'string', required: true },
    address: { type: 'string', required: true },
    description: { type: 'string' },
});

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
