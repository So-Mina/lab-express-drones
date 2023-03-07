const express = require('express');
const router = express.Router();
const Drone = require ('../models/Drone.model')

// require the Drone model here

router.get('/', async (req, res, next) => {
  try { 
    const drones = await Drone.find()
    res.render('drones/list', {
      title: 'Drones List',
      drones
    })
  } catch (err) {
      console.error(err)
    next(err)
  }
})

// create a drone 
router.get('/create', async (req, res, next) => {
  try {
    res.render('drones/create-form',{
      title: 'Create a drone'
    })
  } catch (err) {
      console.error(err)
    next(err)
  }
})

router.post('/create', async (req, res) => {
  try {
    const { name, propellers, maxSpeed } = req.body
    const newDrone = await Drone.create({ name, propellers, maxSpeed })
      console.log(`New drone created: ${newDrone}`)
      res.redirect('/drones')
  } catch (error) {
      console.log(`Error creating drone: ${error}`)
      res.render('drones/create-form', { errorMessage: 'Error creating drone, please try again' })
  }
})

// edit a drone
router.get('/:id/edit', async (req, res, next) => {
  try {
    const drone = await Drone.findById(req.params.id)
      res.render('drones/update-form', {
        tittle : 'Update drone',
        drone })
  } catch (error) {
    next(error)
  }
})

router.post('/:id/edit', async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body
    const updatedDrone = { name, propellers, maxSpeed }
    await Drone.findByIdAndUpdate(req.params.id, updatedDrone)
      res.redirect('/drones')
  } catch (error) {
      res.render('drones/update-form', {
        error })
  }
})

// delete a drone
router.post('/:id/delete', async (req, res, next) => {
  const { id } = req.params
  try {
    const drone = await Drone.findByIdAndDelete(id)
    if (!drone) {
      return res.redirect('/drones')
    }
    res.redirect('/drones')
  } catch (error) {
    next(error)
  }
})


module.exports = router;
