const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        unique: true
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
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Veuillez entrer un email valide.']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'association'],
        default: 'user'
    },
    inscriptions: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inscription' 
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
