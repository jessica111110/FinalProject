const express = require('express');
const router = express.Router();
const Pin = require('../models/Pin');
const Favorite = require('../models/Favorite');
const { isLoggedIn } = require('../middlewares');
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
    fileName,
    favorized: 0
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
      Favorite.deleteMany({ _pin: id })
        .then((removedFavs) => {
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
      Favorite.findOne({ _pin: id, _owner: req.user && req.user._id })
        .then(potentialFav => {
          res.json({
            success: true,
            pinFromDb,
            favedByUser: potentialFav === null ? false : true
          })
        })
        .catch(err => {
          return {
            success: false,
            error: "findoneFailed"
          }
        })
    })
    .catch(err => {
      return {
        success: false,
        error: "PinfindbyIdfailed"
      }
    })
})

/*Favorize item*/
router.get('/:id/favorize', isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const newFavorite = new Favorite({
    _owner: userId,
    _pin: id
  })

  Favorite.find({ _owner: userId, _pin: id })
    .then(favorited => {
      if (favorited.length > 0) {
        Pin.findByIdAndUpdate(id, { $inc: { favorized: -1 } }, { new: true, runValidators: true })
          .then(updatedPin => {
            Favorite.deleteOne({ _owner: userId, _pin: id })
              .then(() => {
                res.json({
                  success: true,
                  fav: false
                })
              })
          })
          .catch(err => {
            return {
              success: false,
              error: err
            }
          })
      }
      else {
        Pin.findByIdAndUpdate(id, { $inc: { favorized: 1 } }, { new: true, runValidators: true })
          .then(updatedPin => {
            newFavorite.save()
              .then(fav => {
                res.json({
                  success: true,
                  fav
                })
              })
          })
          .catch(err => next(err))
      }
    })
    .catch(err => next(err))
});

module.exports = router;
