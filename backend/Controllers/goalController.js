const asyncHandler = require('express-async-handler')

const Goal = require('../Models/goalmodel')

//@desc  Get goals
//@route GET //api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
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

    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

//@desc  Update goals
//@route PUT //api/goals
//@access private
const UpdateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.
        body, {
            new: true,
        })

    res.status(200).json(updatedGoal)
})

//@desc  Delete goals
//@route DELETE //api/goals
//@access private
const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const deletedGoal = await Goal.deleteOne({ _id: req.params.id})

    res.status(200).json(deletedGoal)
})
module.exports = {
    getGoals,
    seGoals,
    UpdateGoals,
    deleteGoals,
}