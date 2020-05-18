/*
* Added by: Samarajeewa D. (IT18189704)
* file: userRoutes1.js
* description: routes related to Users
*
* */



let express = require("express")
const jwt = require('jsonwebtoken');
let userRoutes = express.Router();

let UserModel = require('../schema/User');


////////////damish's part/////////////

/*
* method: POST
* description: register new user
* params:{ username,password,user type}
*
* */
userRoutes.post('/new/:un/:pw/:type1', (req, res) => {
    const username = req.params.un;
    const password = req.params.pw;
    const type = req.params.type1;

    if ((!username || !password || !type)) {
        return res.status(400).json({error: "Invalid format of the body, or fields are missing..."});
    }

    const user = new UserModel({username, password, type});
    user.save()
        .then(product => {
            res.status(201);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json(error);
        });


    if (type === "User") {
        res.send('User Added Successfully');
    } else if (type === "StoreManager") {
        res.send('StoreManager Added Successfully');
    }


});


/*
* method: GET
* description: Find Specific user details/login
* params:{ username,password}
*
* */
userRoutes.get('/api/login/:un/:pw', (req, res) => {
    const username = req.params.un;
    const password = req.params.pw;
    UserModel.findOne({username: username, password: password}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);

        }
    });
});


/*
* method: GET
* description: create new login token
* params:{ userId,username,password }
*
* */
userRoutes.get('/api/get_login_token/:un/:pw', (req, res) => {
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


/*
* method: POST
* description: verify login token
* params:{ headers:{Authorization = Bearer <access_token>} }
*
* */
userRoutes.post('/api/verify_token', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log("Cannot Authorize token!!!")
            res.sendStatus(403);
        } else {
            console.log("Authorized token!!!")
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});


/*
* method: GET
* description: get all store managers data
* params: no-parameters
*
* */
userRoutes.get('/get_all_SM',(req, res)=> {
    let type = "StoreManager";
    UserModel.find({'type': type}, function (err, user) {
        res.json(user);
    });
});



/*
* FORMAT OF TOKEN
* Authorization: Bearer <access_token>
* description: Verify Token
*/
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}


module.exports= userRoutes;
