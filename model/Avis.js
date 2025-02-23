const mongoose = require('mongoose');

const avisSchema = new mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voyage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voyage',
        required: true
    },
    note: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    commentaire: {
        type: String,
        maxlength: 500,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Avis', avisSchema);
