const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require('../../middleware/auth');

const bcrypt = require("bcryptjs");

//User Model
const User = require("../../models/User");

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;
console.log('email in auth:' +req.body.email);
  //validation - TODO improve
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all login data/auth user" });
  }

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "user does not exist" });

    //Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req,res)=>{
  User.findById(req.user.id)
  .select('-password')
  .then(user=> res.json(user));
})

//export default router;
module.exports = router; //not IE6 JS
