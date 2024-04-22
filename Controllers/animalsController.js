const Animal = require('../Models/animalModel');
const ApiFeatures = require('../Utils/ApiFeatures')

exports.createAnimal = async (req, res, next) => {
  try {
    const animal = await Animal.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        animal
      }
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
    console.log(error.message);
  }
}

exports.getAnimal = async (req, res, next) => {
  try {
    const animal = await Animal.findById(req.params.id)

    if (!animal) {
      return res.status(404).json({
        status: 'fail',
        data: {
          message: `Animal with that ID does not exist`
        }
      })
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          animal
        }
      })
    }

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
}


exports.getAllAnimals = async (req, res, next) => {
  const features = new ApiFeatures(Animal.find(), req.query).filter().sort().limitFields().paginate();

  let animals = await features.query
  res.status(200).json({
    status: "succes",
    count: animals.length,
    animals
  })
}