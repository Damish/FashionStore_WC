/*
* Added by: R.A.D.M.Bandara (IT18137392)
* file: productRoutes1.js
* description: routes related to products
*
* */



let express = require("express")
let productRoutes = express.Router();

let Product = require('../schema/product');
let Merns = require('../schema/mern.model')

/////////copied from dinithi/////////

//deliver all products
productRoutes.route('/').get(function (req, res) {
    Product.find(function (err, product
    ) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

//retrieve product by providing id
productRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Product.findById(id, function (err, product) {
        res.json(product);
    });
});

//add new product
productRoutes.route('/add').post(function (req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'product': 'product added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
});

//update product details
productRoutes.route('/update/:id').post(function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (!product)
            res.status(404).send("data is not found");
        else
        product.imageData = req.body.imageData;
        product.product_name = req.body.product_name;
        product.product_category = req.body.product_category;
        product.product_description = req.body.product_description;
        product.product_discount = req.body.product_discount;
        product.product_price = req.body.product_price;
        product.product_qty = req.body.product_qty;

        product.save().then(product => {
            res.json('Product updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });


        });

});

//delete product details
productRoutes.route('/deleteProduct/:id').get(function (req, res) {
    Product.findByIdAndRemove({_id: req.params.id}, function (err, product) {
        if (err)
            res.json(err);
        else
            // res.json('Product Deleted Successfully');
        Merns.deleteMany({'wish_productid': req.params.id}, function (err, result) {

            if (err) {
                res.send(err);
            } else {
                console.log('Product Deleted from all wish lists Successfully');
                res.send('Product Deleted from all wish lists Successfully');
            }
        });
    });



});

//retrive only one product
productRoutes.route('/oneProduct/:id').post(function (req, res) {
    let id = req.params.id;
    Product.findById(id, function (err, product) {
        res.json(product);
    });
});



module.exports= productRoutes;
