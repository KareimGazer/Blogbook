const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')

router.get('/', async (req, res) => {
    const blogs = await Blog.find().populate('user', { username: 1, name: 1 })
    res.status(200).json(blogs)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if (!blog) {
        res.statusMessage = `Blog with id ${id} not found`
        res.status(404).end()
    }
    else {
        res.status(200).json(blog)
    }
})

router.post("/", async (req, res) => {
    let { token } = req
    console.log(token)
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2NzA0ZTQ0MmM0MGIyZWZmMjU3MWRkZjYiLCJpYXQiOjE3Mjg0ODUwNjAsImV4cCI6MTcyODQ4ODY2MH0.7mUpZ89e0XOVxrZf4GBlyIIt86cJd_NwNZXZwJGrS5g"
    const decodedToken = jwt.verify(token, JWT_SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    
    const { title, author, url, likes } = req.body
    const user = await User.findById(decodedToken.id)
    // const user = await User.findById(userId)
    const blog = new Blog({
        user: user._id,
        title,
        author,
        url,
        likes
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, context: 'query' })
    res.status(200).json(blog)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findByIdAndDelete(id, { new: true })
    res.status(204).end()
})

module.exports = router
