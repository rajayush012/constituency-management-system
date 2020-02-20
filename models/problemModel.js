const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: String,
    priority: {type: Number, default: 5},
    description: String,
    constituency: String,
    problemStatus: {type: String, default: 'Submitted'},
    department : String
});


module.exports = mongoose.model('Problem', problemSchema);