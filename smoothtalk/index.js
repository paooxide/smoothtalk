const { App } = require('@slack/bolt');
const dotenv = require('dotenv');

dotenv.config();

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});

/* Add functionality here */




app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered

    say(`Welcome!`);
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
                            "value": "value-0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Neutral",
                                "emoji": true
                            },
                            "value": "value-1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Feeling Lucky",
                                "emoji": true
                            },
                            "value": "value-2"
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
    console.log(body);
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
    console.log(body);
    say(`<@${body.user.id}> Please select time `);
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": " "
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
    console.log(body);
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
                    "action_id": "favoriteHobbies",
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
                            "value": "value-0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Music"
                            },
                            "value": "value-1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Sleep"
                            },
                            "value": "value-2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Movies"
                            },
                            "value": "value-3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Basketball"
                            },
                            "value": "value-4"
                        }
                    ]
                }
            }

        ],
        // text: `Hey there <@${message.user}>!`
    });
});




app.action('favoriteHobbies', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    console.log(body);

    await say({
        blocks: [
            {
                "type": "input",
                "block_id": "input123",
                "label": {
                  "type": "plain_text",
                  "text": "Label of input"
                },
                "element": {
                  "type": "plain_text_input",
                  "action_id": "freeText",
                  "placeholder": {
                    "type": "plain_text",
                    "text": "Enter some plain text"
                  }
                }
              }

        ],
 ,       // text: `Hey there <@${message.user}>!`
    });
});



app.action('freeText', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    console.log(body);
    await say(`Thank you <@${body.user.id}> `);
});



app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});


(async () => {
    // Start the app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();