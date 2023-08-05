const express = require('express')
const router = express.Router()
const { getGoals, seGoals, UpdateGoals, deleteGoals } = require('../Controllers/goalController')


router.get('/', getGoals)
router.post('/', seGoals)
router.delete('/:id', deleteGoals)
router.put('/:id', UpdateGoals)

//OR

// router.get('/', (req, res) => {
//     res.status(200).json({ messsage: 'Get goals' })
// })

// router.post('/', (req, res) => {
//     res.status(200).json({ messsage: 'Set goals' })
// })

// router.put('/:id', (req, res) => {
//     res.status(200).json({ messsage: `update goal ${req.params.id}` })
// })

// router.delete('/:id', (req, res) => {
//     res.status(200).json({ messsage: `Delete goal ${req.params.id}` })
// })


module.exports = router