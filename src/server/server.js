const express = require('express');
const app = express();



const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());


/*
* mongoDB connection is in atlas cluster (cloud based)
* Most probably system wont work if no connection.
* Your internet connection speed also my affect the speed of fetching data.
* */
mongoose.Promise = global.Promise;
// connection string
const connectionUrl = "mongodb+srv://damishs88:damishs88mongodb@mongodb01-zeyxc.mongodb.net/test?retryWrites=true&w=majority";
// connect to the mongo database
mongoose.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("MongoDB not connected!!! check internet connection. ");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        process.exit(1);
    } else {
        console.log("MongoDB working properly...")
    }
});




// app.use(express.static(__dirname));
// app.use(express.json());



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});




/*
*
* importing sub Routes from "/src/server" folder
* 1.userRoutes1
* 2.productRoutes1
* 3.mernRoutes1
* 4.productRoutes1
*
* */

/*
* Added by: Samarajeewa D. (IT18189704)
* action: importing sub Routes from "/src/server/userRoutes1.js"
* file: userRoutes1.js
* description: routes related to Users
*
* */
let UserRoute1 =require("./userRoutes1")
app.use("/users",UserRoute1);


/*
* Added by: Samarajeewa D. (IT18189704)
* action: importing sub Routes from "/src/server/categoryRoutes1.js"
* file: categoryRoutes1.js
* description: routes related to Categories
*
* */
let CategoryRoute1 =require("./categoryRoutes1")
app.use("/category",CategoryRoute1);



/*
* Added by: H.K.Kisal Randula (IT18058574)
* action: importing sub Routes from "/src/server/mernRoutes1.js"
* file: mernRoutes1.js
* description: routes related to wish list
*
* */
let MernRoute1 =require("./mernRoutes1")
app.use("/mern",MernRoute1);


/*
* Added by: R.A.D.M.Bandara (IT18137392)
* action: importing sub Routes from "/src/server/productRoutes1.js"
* file: productRoutes1.js
* description: routes related to products
*
* */
let ProductRoutes1 =require("./productRoutes1")
app.use("/products",ProductRoutes1);


/*
* Added by: A.P.Manjari Mandara (IT18076844)
* action: importing sub Routes from "/src/server/shopRoutes.js"
* file: shopRoutes.js
* description: routes related to shopping cart
*
* */

let shopRoutes =require("./shopRoutes1")
app.use('/shop',shopRoutes);


app.listen(5000, () => console.log('server started on port 5000'));
