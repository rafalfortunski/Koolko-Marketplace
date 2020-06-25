const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingSchema = new Schema ({
    shippingName: {
        type: String,
        required: true,
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    

});
   
const Shipping = mongoose.model('Shipping', shippingSchema);
module.exports = Shipping;