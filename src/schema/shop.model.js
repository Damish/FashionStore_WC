const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Shop = new Schema({

    shop_custid: {
        type: String
    },
    shop_productid: {
        type: String
    },
    shop_proname: {
        type: String
    },
    shop_proprice: {
        type: String
    },
    shop_prodiscount:{
        type: String
    }

});
module.exports = mongoose.model('Shop', Shop);