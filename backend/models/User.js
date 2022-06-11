const mongoose = require('mongoose');

const roles = require('../config/role');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    wallet_address: {
        type: String,
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