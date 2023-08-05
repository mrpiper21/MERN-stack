const asyncHandler = require('express-async-handler')

//@desc  Get goals
//@route GET //api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Goals' })
})

//@desc  Set goals
//@route POST //api/goals
//@access private
const seGoals = asyncHandler(async (req, res) => {
    // error handler
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ messsage: 'Set goals' })
})

//@desc  Update goals
//@route PUT //api/goals
//@access private
const UpdateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ messsage: `update goal ${req.params.id}` })
})

//@desc  Delete goals
//@route DELETE //api/goals
//@access private
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ messsage: `Delete goal ${req.params.id}` })
})
module.exports = {
    getGoals,
    seGoals,
    UpdateGoals,
    deleteGoals,
}