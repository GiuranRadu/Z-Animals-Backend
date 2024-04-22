const express = require('express');
const router = express.Router();
const animalsController = require('../Controllers/animalsController')

// * ROUTES *
router.route('/createAnimal')
  .post(animalsController.createAnimal)


router.route('/:id')
  .get(animalsController.getAnimal)


router.route('/')
  .get(animalsController.getAllAnimals)




module.exports = router;
