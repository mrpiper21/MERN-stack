const express = require('express')
const router = express.Router()
const { getGoals, setGoals, UpdateGoals, deleteGoals } = require('../Controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').delete(protect, deleteGoals).put(protect, UpdateGoals)

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