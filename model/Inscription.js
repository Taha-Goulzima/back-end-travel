const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
    voyage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voyage',
        required: true
    },
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nombrePersonnes: {
        type: Number,
        required: true,
        min: 1
    },
    statut: {
        type: String,
        enum: ['En attente', 'Accepté', 'Refusé'],
        default: 'En attente'
    }
}, { timestamps: true });

module.exports = mongoose.model('Inscription', inscriptionSchema);
