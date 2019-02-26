const express = require('express');
const router = express.Router();
const Pin = require('../models/Pin')
const { isLoggedIn } = require('../middlewares')
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });

// Display all pins/images
router.get('/', (req, res, next) => {
  Pin.find()
    .then(pins => {
      res.json(pins);
    })
    .catch(err => next(err))
});

// Create a pin
router.post('/', isLoggedIn, parser.single("image"), (req, res, next) => {
  if (!req.file) res.status(401).json({ message: "Please, upload a picture" });
  const image = req.file ? req.file.url : req.body.image
  const { lat, long, address, tag, fileName } = req.body;

  const newPin = new Pin({
    lat,
    long,
    address,
    tag,
    _owner: req.user._id,
    image,
    fileName
  })

  newPin.save()
    .then(pin => {
      res.json({
        success: true,
        pin
      })
    })
    .catch(err => next(err))
});

//Edit a pin
router.patch('/:id', isLoggedIn, (req, res, next) => {
  // if (!req.file) res.status(401).json({ message: "Please, upload a picture" });
  // const image = req.file ? req.file.secure_url : req.body.image
  const { lat, long, address, tag } = req.body;
  const { id } = req.params;

  Pin.findByIdAndUpdate(id, { $set: { lat, long, address, tag } }, { new: true, runValidators: true })
    .then(pin => {
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

//Remove a pin
router.delete('/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Pin.findByIdAndRemove(id)
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

//Show one specific pin
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Pin.findById(id)
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
