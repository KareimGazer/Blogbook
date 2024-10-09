const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const {isStrongPassword} = require('../utils/auth_helper')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if (!isStrongPassword(password)) {
        response.status(400).send({
            error: 'Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character.'
        })
        return
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users)
})

module.exports = usersRouter