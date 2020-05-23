/*
* Added by: Samarajeewa D. (IT18189704)
* file: userRoutes1.js
* description: routes related to Users
*
* */


let express = require("express")
let categoryRoutes = express.Router();

let CategoryModel = require('../schema/Category');

// let Log = require('../schema/logs');

categoryRoutes.post('/new/:id/:category', (req, res) => {
    const cat_id = req.params.id;
    const cat_name = req.params.category;

    if ((!cat_name || !cat_id)) {
        return res.status(400).json({error: "Invalid format of the body, or fields are missing..."});
    }

    const category = new CategoryModel({cat_name,cat_id});

    category.save()
        .then(category => {

            res.send(category);

        })
        .catch(error => {
            console.log(error);
            return res.status(500).json(error);
        });


});


categoryRoutes.route('/').get(function(req, res) {
    CategoryModel.find(function(err,category) {
        if (err) {
            console.log(err);
        } else {
            res.json(category);
        }
    });
});



categoryRoutes.route('/remove_category/:name').delete(function(req, res) {

    let name = req.params.name;
    CategoryModel.deleteOne({ 'cat_name' : name }, function(err, result) {

        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

});




module.exports= categoryRoutes;
