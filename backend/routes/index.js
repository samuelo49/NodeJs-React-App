const router = require('express').Router(); // get the router instance of express

const userController = require('../controllers/user');

// map the signup request to the signup function
router.post("/signup", userController.signup);

// Map the `login` request to the login function
router.post("/login", userController.login);

module.exports = router;