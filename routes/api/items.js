const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  //res.header("Access-Control-Allow-Origin", "*");//CORS WORKAROUND, hardcoding port
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items))
});

// @route   POST api/items
// @desc    Creat An Item
// @access  Public
router.post("/", (req, res) => {
  //res.header("Access-Control-Allow-Origin", "*");//CORS WORKAROUND, hardcoding port
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Public
router.delete("/:id", (req, res) => {
  //res.header("Access-Control-Allow-Origin", "*");//CORS WORKAROUND, hardcoding port
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ success: false });
    });
});

//export default router;
module.exports = router; //not IE6 JS
