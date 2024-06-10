var express = require('express');
var router = express.Router();


//Signup
const { body } = require('express-validator');
const signupController = require('../Controllers/signController');
router.route('/signup')
    .get(signupController.getAllUsers)
    .post(
        [
            body('username').isString().withMessage('Please Enter your Username'),
            body('email').isEmail().withMessage('Email should be valid'),
            body('password').isString().withMessage('Please Enter your Password'),
        ]
        , signupController.addUser)






//Admin Logout
// router.get("/admin-logout", (request, response, next) => {
//     response.cookie("jwt", "", {
//         httpOnly: true,
//         maxAge: 1
//     });
//     response.redirect('/Admin-Login')
// })

module.exports = router;
