// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
const config = require('./config/config.js');

const botsdk = require("slackbots");
const axios = require("axios");



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
mongoose.connect("mongodb+srv://taurus:taurus84881138@cluster-taurus.ppzuy.mongodb.net/slackbotDB?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log(`Error connecting db to ${global.gConfig.app_name} `)
else
    console.log(`Db connected successfully to ${global.gConfig.app_name}`)

// Setup server port
var port = process.env.PORT || 8080;


bot = new SlackBot({
  name: 'smooth talk',
  token: 'xoxb-1816610715921-1806517601586-ujTwV2UVnWWvy1Um8QG4btyB',
});

bot.on('start', () => {
  const params = {
    icon_emoji: ":smile:",
  };

  bot.postMessageToChannel("general", "Welcome to the smooth Talk bot", params);
  bot.postMessageToUser('ogunye4pao', 'meow!', params); 
});

bot.on('error', err => console.error(err));

bot.on('message', data => {
    if (data.type !== 'message') {
        return;
    }
    console.log(data)
})

// Send message for default URL
app.get('/', (req, res) => res.send(`Hello, Welcome to ${global.gConfig.app_name}`));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log(`Running ${global.gConfig.app_name} on port ` + port);
});