const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    preferences: {
        type: [String], // e.g., ['non-dairy', 'low-sugar']
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
