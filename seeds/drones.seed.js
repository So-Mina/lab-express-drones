// Iteration #1
const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URI = process.env.MONGODB_URI
  
const Drone = require('../models/Drone.model')

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
]

console.log(`MONGO_URI: ${MONGO_URI}`);

mongoose
  .set('strictQuery', true)
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to the database')
    
  Drone
  .create(drones)
  .then((createdDrones) => {
    console.log(`Successfully created ${createdDrones.length} drones`)
    mongoose.disconnect()
  })
  .catch((error) => {
    console.log(`Error creating drones: ${error}`)
    mongoose.disconnect()
  })
})
.catch((error) => {
  console.log(`Error connecting to the database: ${error}`)

})