const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema ({

    product_id: {
        type: String,
        required: true
    },

    product_name: {
        type: String, 
        required: true
    },

    description: {
        type: String, 
    },

    short_description: {
        type: String
    },

    price: {
        type: Number, 
        required: true
    },

    currency_code: {
        type: String,
        default: 'PLN'
    },
    
    currency_sign: {
        type: String,
        default: 'zł'
    },

    main_image_url: {
        type: String,
    },

    image1_url: {
        type: String,
    },

    image2_url: {
        type: String,
    },
    category: {
        category_id: {
         type: String 
        },
        category_slug: {
            type: String
        },
        category_name: {
            type: String
        }
    },
    _seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller'
    }

});

module.exports = mongoose.model('Listing', listingSchema);  