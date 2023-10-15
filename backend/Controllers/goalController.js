const asyncHandler = require('express-async-handler')

const Goal = require('../Models/goalmodel')

const user = require('../Models/userModel') // included to make sure that users can't update and delete each others goals

//@desc  Get goals
//@route GET //api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id})

    res.status(200).json(goals)
})

//@desc  Set goals
//@route POST //api/goals
//@access private
const setGoals = asyncHandler(async (req, res) => {
    // error handler
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
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

    // making sure users do not update and delete each others goals
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User mot foumd')
    }
    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id ) {
        res.status(401)
        throw new Error('User not authorized')
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
    
     // making sure users do not update and delete each others goals
     const user = await Goal.findById(req.user.id)
     // Check for user
     if (!user) {
         res.status(401)
         throw new Error('User not foumd')
     }
     // make sure the logged in user matches the goal user
     if (goal.user.toString() !== user.id) {
         res.status(401)
         throw new Error('User not authorized')
     }

    const deletedGoal = await Goal.deleteOne({ _id: req.params.id})

    res.status(200).json(deletedGoal)
})
module.exports = {
    getGoals,
    setGoals,
    UpdateGoals,
    deleteGoals,
}