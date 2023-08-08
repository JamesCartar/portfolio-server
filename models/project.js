const mongoose = require('mongoose');

let projectSchema = new mongoose.Schema({
    no: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        default: 0,
    },
    ratings: [{
        type: Number,
    }],
    raters: [{
        type: String,
    }],
},
{
    timestamps: true
});

module.exports = mongoose.model('projects', projectSchema);