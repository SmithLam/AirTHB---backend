var express = require('express');
var router = express.Router();
let mongoose=require('mongoose')
let User = require('../models/user')
let {auth}=require('../middleware/auth')





/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// Login 
router.post("/login", async (req, res, next) => {
    let { email, password } = req.body
    try {
        let user = await User.comparePassword(email, password)
        let token = await user.generateToken()
        console.log(token)
        res.send({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token


            },
            message: "Success"
        })
    } catch (err) {
        res.send(err)
    }
})

// Get current user
router.get("/me", auth, async (req, res, next) => {
    res.send(req.user)
})
module.exports = router;
