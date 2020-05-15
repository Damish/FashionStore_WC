const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = express.Router();

const UserModel = require('../schema/User');
let Product = require('../schema/product');

app.use(cors());
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// connection string
const connectionUrl = "mongodb+srv://damishs88:damishs88mongodb@mongodb01-zeyxc.mongodb.net/test?retryWrites=true&w=majority";
// connect to the mongo database
mongoose.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log("MongoDB working properly...")
    }
});

app.use(express.static(__dirname));
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});


app.post('/api/users/new/:un/:pw', (req, res) => {
    const username = req.params.un;
    const password = req.params.pw;

    if ((!username || !password)) {
        return res.status(400).json({error: "Invalid format of the body, or fields are missing..."});
    }

    const user = new UserModel({username, password});
    user.save()
        .then(product => {
            res.status(201);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json(error);
        });
    res.send('User Added Successfully');
})


// GET request to get all the users
app.get('/api/login/:un/:pw', (req, res) => {

    const username = req.params.un;
    const password = req.params.pw;


    UserModel.findOne({ username: username, password: password }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            if(result!==null){
                res.send(true);
            }else{
                res.send(false);
            }


        }
    });

});





app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/verify_token', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});


app.get('/api/get_login_token/:un/:pw', (req, res) => {
    const user = {
        userId: Date.now().toString(),
        username: req.params.un,
        password: req.params.pw
    }
    jwt.sign({user}, 'secretkey', {expiresIn: '60s'}, (err, token) => {
        res.json({
            token
        });
        console.log("data token: " + token);
    });
});


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

/////////copied from dinithi/////////




//deliver all products
productRoutes.route('/').get(function(req, res) {
    Product.find(function(err, product
    ) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

//retrieve product by providing id
productRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

//add new product
productRoutes.route('/add').post(function(req, res) {
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
productRoutes.route('/update/:id').post(function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (!product)
            res.status(404).send("data is not found");
        else
            product.product_name = req.body.product_name;
        product.product_category = req.body.product_category;
        product.product_description = req.body.product_description;
        product.product_discount= req.body.product_discount;
        product.product_price= req.body.product_price;
        product.product_qty= req.body.product_qty;

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
    Product.findByIdAndRemove({ _id: req.params.id }, function (err, product) {
        if (err) res.json(err);
        else res.json('Product Deleted Successfully');
    });
});

//retrive only one product
productRoutes.route('/oneProduct/:id').post(function(req, res) {
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

app.use('/products', productRoutes);




/////end of copying from dinithi/////

app.listen(5000, () => console.log('server started on port 5000'));
