const mongoose = require('mongoose');

const mlaSchema = new mongoose.Schema({
    name: String,
    constituency: String,
    email: String,
    password: String,
    fund: {
        education : { type: Number, default: 100000 },
        infrastructure : { type: Number, default: 100000 },
        healthcare : { type: Number, default: 100000 },
        tourism : { type: Number, default: 100000 },
        miscellaneous : { type: Number, default: 100000 },
        remaining : { type: Number, default: 100000 }
    }
});


module.exports = mongoose.model('MLA', mlaSchema);