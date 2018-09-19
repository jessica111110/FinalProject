const express = require('express');
const Pin = require('../models/Pin')
const { isLoggedIn } = require('../middlewares')
const router = express.Router();

// Route to get all pins
router.get('/pins', (req, res, next) => {
  Pin.find()
    .then(pins => {
      res.json(pins);
    })
    .catch(err => next(err))
});

// Route to add a pin
router.post('/add-new', isLoggedIn, (req, res, next) => {
  const newPin = new Pin({
    lat: req.body.lat,
    long: req.body.long,
    address: req.body.address,
    country: req.body.country,
    image: req.body.image,
    tag: req.body.tag,
    _owner: req.user._id
  })
  newPin.save()
    .then((pin) => {
      console.log("The pin was saved!!!");
      res.json({
        success: true,
        pin
      })
    })
    .catch(err => next(err))
});

//Route to edit a pin
router.patch('/:id', isLoggedIn, (req, res, next) => {
  const { lat, long, address, country, image, tag } = req.body;
  Pin.findByIdAndUpdate(req.params.id, { $set: { lat, long, address, country, image, tag } }, { new: true, runValidators: true })
    .then((pin) => {
      res.json({
        success: true,
        pin
      })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err
      })
    })
})

//Route to remove a pin
router.delete('/:id/remove', isLoggedIn, (req, res, next) => {
  Pin.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        success: true
      })
    })
    .catch(err => {
      return {
        success: false,
        error: err
      }
    })
})

//Route to get one specific pin
router.get('/pins/:id', (req, res, next) => {
  Pin.findById(req.params.id)
    .then(pinFromDb => {
      res.json({
        success: true,
        pinFromDb
      })
    })
    .catch(err => {
      return {
        success: false,
        error: err
      }
    })
})

module.exports = router;
