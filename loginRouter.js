var express = require('express');
var router = express.Router();

let loginController = require('../Controllers/loginController')


//Get All products
router.route('/login')
    //Login
    .post(loginController.login)



module.exports = router;
