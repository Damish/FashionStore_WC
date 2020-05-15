const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let product = new Schema({
    product_img:{
       type: String
    },
    product_name: {
        type: String,
        required : true
    },
    product_category: {
        type: String,
        required : true
    },
    product_description: {
        type: String,
        required : true
    },
    product_price: {
        type: Number,
        required : true
    },
    product_qty: {
        type: Number,
        required : true
    },
    product_discount: {
        type: Number,
        required : true
    },
});


module.exports = mongoose.model('Product', product);
