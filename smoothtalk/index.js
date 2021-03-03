const { App } = require('@slack/bolt');
const dotenv = require('dotenv');
// let express = require('express');
// let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const config = require('./config/config.js');
// let apiRoutes = require("./routers/api-routes");
SlackBot = require("./model/slackbotModel");
// botController= require("./controller/slackbotController")


// var botSave = new botController();


dotenv.config();

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});

/* Add functionality here */

var userResponse = {};


mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log(`Error connecting db to ${global.gConfig.app_name} `)
else
    console.log(`Db connected successfully to ${global.gConfig.app_name}`)


app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    // userResponse.userID=message
    // console.log(message);
    await say(`Welcome!`);
    await say({
        blocks: [
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "How are you doing?"
                },
                "accessory": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Doing Well",
                                "emoji": true
                            },
                            "value": "Doing Well"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Neutral",
                                "emoji": true
                            },
                            "value": "Neutral"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Feeling Lucky",
                                "emoji": true
                            },
                            "value": "Feeling Lucky"
                        }
                    ],
                    "action_id": "static_select-action"
                }
            }
        ],
        text: `Hey there <@${message.user}>!`
    });
});




// app.message('hellott', async ({ message, say }) => {
//     // say() sends a message to the channel where the event was triggered

//     await say(`Welcome! How are you doing ?`);
//     await say({
//         blocks: [
//             {
//                 "type": "section",
//                 "text": {
//                     "type": "mrkdwn",
//                     "text": `Hey there <@${message.user}>!`
//                 },
//                 "accessory": {
//                     "type": "button",
//                     "text": {
//                         "type": "plain_text",
//                         "text": "Click Me"
//                     },
//                     "action_id": "button_click"
//                 }
//             }
//         ],
//         text: `Hey there <@${message.user}>!`
//     });
// });




app.action('static_select-action', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    // console.log(body.user.username);
    userResponse.userID = body.user.username
    userResponse.feeling = body.actions[0].selected_option.value
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "when are you free this week for a walk?"
                },
                "accessory": {
                    "type": "datepicker",
                    "initial_date": "2021-03-03",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select a date",
                        "emoji": true
                    },
                    "action_id": "datepicker-action"
                }
            }
        ],
        // text: `Hey there <@${message.user}>!`
    });

});



app.action('datepicker-action', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    console.log(body.actions[0].selected_date);
    userResponse.freeTimeStart = body.actions[0].selected_date
    // await say(`<@${body.user.id}> Please select time `);
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Please select time "
                },
                "accessory": {
                    "type": "timepicker",
                    "initial_time": "12:30",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select time",
                        "emoji": true
                    },
                    "action_id": "timepicker-action"
                }
            }

        ],
        // text: `Hey there <@${message.user}>!`
    });

});



app.action('timepicker-action', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    console.log(body.actions[0].selected_time);
    userResponse.freeTimeStop = body.actions[0].selected_time
    await say({
        blocks: [
            {
                "type": "section",
                "block_id": "section678",
                "text": {
                    "type": "mrkdwn",
                    "text": "What are your favorite hobbies"
                },
                "accessory": {
                    "action_id": "favorite_hobbies",
                    "type": "multi_static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select items"
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Football"
                            },
                            "value": "Football"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Music"
                            },
                            "value": "Music"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Sleep"
                            },
                            "value": "Sleep"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Movies"
                            },
                            "value": "Movies"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Basketball"
                            },
                            "value": "Basketball"
                        }
                    ]
                }
            }

        ],
        // text: `Hey there <@${message.user}>!`
    });
});




app.action('favorite_hobbies', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    var hobbies;
    console.log(body.actions[0].selected_options);
    hobbies = body.actions[0].selected_options.map(hob => hob.value);

    userResponse.hobbies = hobbies.toString();
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "What are the first 3 digits on the number scale?"
                },
                "accessory": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "1, 2, 3",
                                "emoji": true
                            },
                            "value": "1, 2, 3"
                        }
                    ],
                    "action_id": "number_scale"
                }
            }

        ],
        // text: `Hey there <@${message.user}>!`
    });
});



app.action('number_scale', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    userResponse.numberScaleQuestion = body.actions[0].selected_option.value
    console.log(body.actions[0].selected_option.value);
    console.log(userResponse)

    var slackbotRes = new SlackBot();
    slackbotRes.userID = userResponse.userID ? userResponse.userID : slackbotRes.userID;
    slackbotRes.feeling = userResponse.feeling;
    slackbotRes.freeTimeStart = userResponse.freeTimeStart;
    slackbotRes.freeTimeStop = userResponse.freeTimeStop;
    slackbotRes.hobbies = userResponse.hobbies;
    slackbotRes.numberScaleQuestion = userResponse.numberScaleQuestion;
    slackbotRes.save(function (err) {
        if (err)
            console.log(err);
        // else
        //     return "New Response created!"
    });

    await say(`Thank you <@${body.user.id}> `);
});

console.log(userResponse)
// botController.saveBotRequest(userResponse)

app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});


app.use('/api', apiRoutes);


(async () => {
    // Start the app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();