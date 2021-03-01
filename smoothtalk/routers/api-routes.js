// api-routes.js
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'Smooth Talk API Endpoint',
        message: 'Welcome to Smooth Talk API built with love and care!',
    });
});
// Import slackbotController controller
var botController = require('../controller/slackbotController');
// Contact routes
router.route('/botresponse')
    .get(botController.index)
    .post(botController.new);
router.route('/botresponse/:userID')
    .get(botController.view)
    .patch(botController.update)
    .put(botController.update)
    .delete(botController.delete);
// Export API routes
module.exports = router;