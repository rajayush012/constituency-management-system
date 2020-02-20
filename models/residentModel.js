const mongoose = require('mongoose');
const Problem = require('./problemModel');

const residentSchema = new mongoose.Schema({
    name: String,
    number: String,
    voterID: String,
    constituency: String,
    email: String,
    password: String,
    problems: [{ id: {type: mongoose.Schema.Types.ObjectId, ref: 'Problem'} }]
});


module.exports = mongoose.model('Resident', residentSchema);