const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Mern = new Schema({
    wish_cusid: {
        type: String
    },
    wish_productid: {
        type: String
    },
    wish_name: {
        type: String
    },
    wish_price: {
        type:String
    },
    wish_discount: {
        type:String
    }
});

module.exports = mongoose.model('mern', Mern);