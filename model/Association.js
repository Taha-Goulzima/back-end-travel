const mongoose = require('mongoose');

const associationSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 300
    },
    photo: {
        type: String,
        required: true // URL de l'image obligatoire
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Veuillez entrer un email valide.']
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{10,15}$/.test(v);
            },
            message: 'Le numéro de téléphone doit comporter entre 10 et 15 chiffres.'
        }
    },
    voyages: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voyage'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Association', associationSchema);
