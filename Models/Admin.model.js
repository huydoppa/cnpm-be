const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    id: { type: 'string', required: true },
    phone: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    name: { type: 'string' },
    email: { type: 'string' },
    avatar: {type: 'string' },
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
