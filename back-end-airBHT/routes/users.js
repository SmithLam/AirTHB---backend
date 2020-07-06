var express = require('express');
var router = express.Router();
let User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, isHost } = req.body

  try {
    console.log("zo day roi")
    let user = await User.findOne({ email })
    if (user) {
      console.log("Trùng rồii")
      return res.status(400).send({
        errors: "User already existed"
      })
    }

    let newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      isHost: isHost

    })
    await newUser.save()
    token = await newUser.generateToken()

    res.status(201).send({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        isHost: isHost,
        token: token
      },
      message: "Success ^^"
    })
  } catch (err) {
    res.status(400).send({
      errors: err,
      message: "Something went wrong!"

    })
  }

})

module.exports = router;
