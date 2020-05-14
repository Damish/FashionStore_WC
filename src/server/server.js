const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');


const UserModel = require('../schema/User');


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


app.listen(5000, () => console.log('server started on port 5000'));