const { App } = require('@slack/bolt');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

/* Add functionality here */

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

// Reverse all messages the app can hear
app.message(async ({ message, say }) => {
    const reversedText = [...message.text].reverse().join("");
    await say(reversedText);
  });