/*
* Added by: A.P.Manjari Mandara (IT18076844)
* file: shopRoutes.js
* description: routes related to shopping cart
*
* */


let express = require("express")
let shopRoutes = express.Router();

let Shops = require('../schema/shop.model');

let Checkouts = require('../schema/Checkoutmodel');


shopRoutes.route('/').get(function(req, res) {
    Shops.find(function(err,shop) {
        if (err) {
            console.log(err);
        } else {
            res.json(shop);
        }
    });
});

shopRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Shops.find({'shop_custid':id}, function(err, shop) {

        res.json(shop);
    });

});

shopRoutes.route('/addshopping').post(function(req, res) {
    let shop= new Shops(req.body);
    shop.save()
        .then(shop => {
            res.status(200).json({'shop': 'shopping item added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new shopping item fail');
        });
});

shopRoutes.route('/removeShopItem/:cid/:pid').delete(function(req, res) {

    let cid = req.params.cid;
    let pid = req.params.pid;


    Shops.deleteOne({'shop_productid':pid ,'shop_custid':cid }, function(err, result) {

        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

});

shopRoutes.route('/addtocheckout').post(function(req, res) {
    let checkout= new Checkouts(req.body);
    checkout.save()
        .then(Checkouts => {
            res.status(200).json({'checkout': 'checkout pay done successfully'});
        })
        .catch(err => {
            res.status(400).send('checkout pay fail');
        });
});


//emptyshoppingcart

shopRoutes.route('/emptyshoppingcart/:cid').delete(function(req, res) {

    let cid = req.params.cid;



    Shops.deleteMany({'shop_custid':cid}, function(err, result) {

        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

});

///end of emptyshoppingcart


module.exports= shopRoutes;