// slackBotModel.js
var mongoose = require('mongoose');


// Setup schema
var botResponseSchema = mongoose.Schema({  
    userID:{
        type: String,
        required: true
    },
    feeling:{
        type: String,
        required: true
    },
    freeTimeStart:{
        type: String,
        required: true,
        default: Date.now
    },
    freeTimeStop:{
        type: String,
        required: true
    },
    hobbies:{
        type: String,
        required: true
    },
    numberScaleQuestion:{
        type: String,
        required: true
    }
    

});


// Export SlackBot model
var botResponse = module.exports = mongoose.model('botResponse', botResponseSchema);
module.exports.get = function (callback, limit) {
    botResponse.find(callback).limit(limit);
}