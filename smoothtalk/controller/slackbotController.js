// slackbotController.js
// Import SlackBot model
SlackBot = require("../model/slackbotModel");
const botsdk = require("slackbots");
const axios = require("axios");

bot = new SlackBot({
  name: "smooth talk",
  token: "xoxb-1816610715921-1806517601586-ujTwV2UVnWWvy1Um8QG4btyB",
});

bot.on("start", () => {
  const params = {
    icon_emoji: ":smile:",
  };

  bot.postMessageToChannel("general", "Welcome to the smooth Talk bot", params);
});

// Handle index actions
exports.index = function (req, res) {
  SlackBot.get(function (err, botResponse) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Slack response retrieved successfully",
      data: botResponse,
    });
  });
};
// Handle create SlackBot actions
exports.new = function (req, res) {
  var slackbotRes = new SlackBot();
  slackbotRes.userID = req.body.userID ? req.body.userID : slackbotRes.userID;
  slackbotRes.feeling = req.body.feeling;
  slackbotRes.freeTimeStart = req.body.freeTimeStart;
  slackbotRes.freeTimeStop = req.body.freeTimeStop;
  slackbotRes.hobbies = req.body.hobbies;
  slackbotRes.numberScaleQuestion = req.body.numberScaleQuestion;
  // save the SlackBot rsponse and check for errors
  slackbotRes.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: "New Response created!",
      data: slackbotRes,
    });
  });
};

// Handle view SlackBot info
exports.view = function (req, res) {
  // SlackBot.find(req.params.userID, function (err, slackbotRes) {
  SlackBot.find({ userID: req.params.userID }, function (err, slackbotRes) {
    if (err) res.send(err);
    res.json({
      message: "Response loaded successfully",
      data: slackbotRes,
    });
  });
};

// Handle update SlackBot response info
exports.update = function (req, res) {
  SlackBot.find({ userID: req.params.userID }, function (err, slackbotRes) {
    var slackbotRes = new SlackBot();
    if (err) res.send(err);
    slackbotRes.userID = req.body.userID ? req.body.userID : slackbotRes.userID;
    slackbotRes.feeling = req.body.feeling;
    slackbotRes.freeTimeStart = req.body.freeTimeStart;
    slackbotRes.freeTimeStop = req.body.freeTimeStop;
    slackbotRes.hobbies = req.body.hobbies;
    slackbotRes.numberScaleQuestion = req.body.numberScaleQuestion;
    // save the SlackBot and check for errors
    slackbotRes.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Response updated successfully",
        data: slackbotRes,
      });
    });
  });
};

// Handle delete SlackBot
exports.delete = function (req, res) {
  SlackBot.remove(
    {
      userID: req.params.userID,
    },
    function (err, slackbotRes) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Response deleted",
      });
    }
  );
};
