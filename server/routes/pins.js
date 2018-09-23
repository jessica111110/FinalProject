const express = require('express');
const Pin = require('../models/Pin')
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
///const uploadCloud = require("../config/cloudinary.js");

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });

// Route to get all pins
router.get('/', (req, res, next) => {
  Pin.find()
    .then(pins => {
      res.json(pins);
    })
    .catch(err => next(err))
});

// Route to add a pin
router.post('/', isLoggedIn, parser.single("image"), (req, res, next) => {
  const image = req.file ? req.file.url : req.body.image
  const { lat, long, address, country, tag } = req.body;
  const newPin = new Pin({
    lat, long, address, country, tag, _owner: req.user._id, image
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
router.patch('/:id', isLoggedIn, parser.single("image"), (req, res, next) => {
  let updatedImage;
  if (req.file) {
    updatedImage = req.file.secure_url
  }
  else {
    updatedImage = req.body.image
  }
  const { lat, long, address, country, tag } = req.body;
  Pin.findByIdAndUpdate(req.params.id, { $set: { lat, long, address, country, tag, image: updatedImage } }, { new: true, runValidators: true })
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
router.delete('/:id', isLoggedIn, (req, res, next) => {
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
router.get('/:id', (req, res, next) => {
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
