const mongoose = require('mongoose');

const roles = require('../config/role');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    wallet_address: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: [roles["superadmin"], roles["admin"], roles["user"]]
    }
});

module.exports = mongoose.model("User", UserSchema);