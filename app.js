const express = require('express');
const cors = require('cors');
const animalsRoutes = require('./Routes/animalsRoutes')
const sortingRoutes = require('./Routes/sortingRoutes')
const uploadRoutes = require('./Routes/uploadRoutes')


let app = express();
app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
})


//* Creating Upload Endpoint for images
app.use('/images', express.static('uploads/images'))


//* ROUTES * 
app.use("/animals", animalsRoutes)
app.use("/sortAnimals", sortingRoutes)
app.use('/upload', uploadRoutes)

//* TEST ROUTE *
app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    message: 'Online'
  })
  console.log('App started! ✅');
})


module.exports = app
