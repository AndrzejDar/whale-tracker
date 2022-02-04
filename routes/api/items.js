const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items))
});

// @route   POST api/items
// @desc    Creat An Item
// @access  Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save()
    .then((item) => res.json(item))
    .catch(err=>console.log(err));
});

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ success: false });
    });
});

//export default router;
module.exports = router; //not IE6 JS
