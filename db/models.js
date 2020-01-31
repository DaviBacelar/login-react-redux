const mongoose = require('mongoose');

module.exports = {
    user: mongoose.model('User', {
        email: String,
        cpf: String,
        password: String,
        created_on: { type : Date, default: Date.now }
    })
}