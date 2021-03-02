const { App } = require('@slack/bolt');

const app = new App({
    token: "xoxb-1816610715921-1806517601586-BEYLAJn6dSb1sCCbAQM3bM9M",
    signingSecret: "5c19978b7c543a8f6591d3ff6d089241"
});

/* Add functionality here */

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

app.message(async ({ message, say }) => {
    const reversedText = [...message.text].reverse().join("");
    await say(reversedText);
  });