const Animal = require('../Models/animalModel')


//* Optional routes * 
exports.getByRegion = async (req, res, next) => {
  try {
    const REGIONS = await Animal.aggregate([
      {
        $unwind: '$region',
      },
      {
        $group: {
          _id: { $toUpper: '$region' },
          animalsLength: { $sum: 1 },
          animals: { $push: '$$ROOT' },
          // animals: { $push: '$name' } //! save just the name
        }
      },
      {
        $sort: { _id: 1 }  //! sortez id-ul in ordine alfabetica A->Z
      }
    ])

    res.status(200).json({
      status: 'success',
      length: REGIONS.length,
      REGIONS
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
}

exports.sortBySelectedRegion = async (req, res, next) => {
  const selectedRegion = req.params.region
  console.log(selectedRegion);
  try {
    const REGIONS = await Animal.aggregate([
      {
        $unwind: '$region',
      },
      {
        $group: {
          _id: { $toUpper: '$region' },
          animalsLength: { $sum: 1 },
          animals: { $push: '$$ROOT' },
          // animals: { $push: '$name' } //! save just the name
        }
      },
      {
        $sort: { _id: 1 }  //! sortez id-ul in ordine alfabetica A->Z
      }
    ])

    let result = REGIONS.filter(obj => obj._id.toLowerCase() === selectedRegion.toLowerCase())

    res.status(200).json({
      status: 'success',
      result

    })

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
}


exports.getAllClasses = async (req, res, next) => {

  try {
    const classes = await Animal.aggregate([
      {
        $unwind: '$class'
      },
      {
        $group: {
          _id: { $toUpper: '$class' },
          count: { $sum: 1 },
          animals: { $push: '$$ROOT' },
        }
      }
    ])

    res.status(200).json({
      status: 'success',
      classesLength: classes.length,
      classes
    })

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
}

exports.sortBySelectedClass = async (req, res, next) => {
  const animalClass = req.params.animalClass
  console.log(animalClass);

  try {
    const classes = await Animal.aggregate([
      {
        $unwind: '$class'
      },
      {
        $group: {
          _id: { $toUpper: '$class' },
          count: { $sum: 1 },
          animals: { $push: '$$ROOT' },
        }
      }
    ])

    let selectedClass = classes.filter(c => c._id.toLowerCase() === animalClass)

    res.status(200).json({
      status: 'success',
      selectedClass
    })

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
}
