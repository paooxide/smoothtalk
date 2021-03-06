let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const config = require('./config/config.js');
const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();




process.env.NODE_ENV = 'development';
// uncomment below line to move this code against production environment
// process.env.NODE_ENV = 'staging';

// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./routers/api-routes");


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
// mongoose.connect(`${global.gConfig.database}`, { useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log(`Error connecting db to ${global.gConfig.app_name} `)
else
    console.log(`Db connected successfully to ${global.gConfig.app_name}`)

// Setup server port
var port = process.env.PORTB || 8081;




// Send message for default URL
app.get('/', (req, res) => res.send(`Hello, Welcome to ${global.gConfig.app_name}`));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log(`Running ${global.gConfig.app_name} on port ` + port);
});