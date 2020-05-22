const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CheckOutpay = new Schema({

    pay_fullname: {
        type:String
    },
    pay_email: {
        type: String
    },
    pay_address: {
        type: String
    },
    pay_city: {
        type: String
    },
    pay_state: {
        type: String
    },
    pay_zip: {
        type: String
    },
    pay_cardtype: {
        type: String
    },
    pay_cardname: {
        type: String
    },
    pay_cardnumber: {
        type:Number
    },
    pay_expmonth: {
        type: String
    },
    pay_expyr: {
        type: Number
    },
    pay_cvv: {
        type: String
    },
    pay_total: {
        type: String
    },
    pay_userid: {
        type: String
    }

});
module.exports = mongoose.model('checkoutpay', CheckOutpay);