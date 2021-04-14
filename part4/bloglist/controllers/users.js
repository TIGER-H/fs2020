const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
  const body = req.body
  if (body.password.length < 3) {
    return res
      .status(403)
      .json({ error: 'password must be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

module.exports = userRouter
