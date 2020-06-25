const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Listings = require('./listings');

const sellerSchema = new Schema ({
    seller_name: {
        type: String,
    },
    company_name: {
        type: String,
    },
    street: {
        type: String,
    },
    postal_code: {
        type: String,
    },
    city: {
        type: String,
    },
    coutry: {
        type: String,
    },
    email: {
        type: String,
    },

    tel: {
        type: String,
    },

    company_number: {
        type: String,
    },

    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

const Seller = mongoose.model('Company', sellerSchema);
module.exports = Seller;