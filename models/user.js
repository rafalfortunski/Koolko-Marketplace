const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Seller = require('./seller');

// User schema
const userSchema = new Schema ({
    email: {
        type: String, 
        required: true,
        unique: true,
        index: true
    },
    
    password: {
        type: String, 
        required: true
    },

    full_name: {
        type: String
    },

    role: {
        type: String,
        default: 'user',
    },
    
    registred_at: {
        type: Date,
        default: Date.now
    },

    _seller: {
        type: Schema.Types.ObjectId,
        ref: Seller
    },

});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;