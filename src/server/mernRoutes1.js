/*
* Added by: H.K.Kisal Randula (IT18058574)
* file: mernRoutes1.js
* description: routes related to wish list
*
* */




let express = require("express")
let mernRoutes = express.Router();

let Merns = require('../schema/mern.model');



mernRoutes.route('/').get(function (req, res) {
    Merns.find(function (err, mern) {
        if (err) {
            console.log(err);
        } else {
            res.json(mern);
        }
    });

});


mernRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;

    Merns.find({'wish_cusid': id}, function (err, mern) {
        res.json(mern);
    });

});

//delete wishlist item
mernRoutes.route('/removeWishItem/:cid/:pid').delete(function (req, res) {

    let cid = req.params.cid;
    let pid = req.params.pid;


    Merns.deleteOne({'wish_productid': pid, 'wish_cusid': cid}, function (err, result) {

        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

});


mernRoutes.route('/addwish').post(function (req, res) {
    let mern = new Merns(req.body);
    mern.save()
        .then(mern => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});


module.exports= mernRoutes;