const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let product = new Schema({



    imageName: {
        type: String,
        default: "none",
        // required: true
    },
    imageData: {
        type: String,
        // required: true
    },




    // product_img:{
    //    type: String
    // },
    product_name: {
        type: String,

    },
    product_category: {
        type: String,

    },
    product_description: {
        type: String,

    },
    product_price: {
        type: Number,

    },
    product_qty: {
        type: Number,

    },
    product_discount: {
        type: Number,

    },
});


module.exports = mongoose.model('Product', product);
