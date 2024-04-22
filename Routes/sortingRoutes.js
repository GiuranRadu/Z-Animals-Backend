const express = require('express');
const router = express.Router();
const sortingController = require('./../Controllers/sortingController')


// * ROUTES *
router.route('/regions')
  .get(sortingController.getByRegion)


router.route('/regions/:region')
  .get(sortingController.sortBySelectedRegion)


router.route('/classes')
  .get(sortingController.getAllClasses)


router.route('/classes/:animalClass')
  .get(sortingController.sortBySelectedClass)



module.exports = router;
