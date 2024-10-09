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
    const { title, author, url, likes } = req.body
    const {userInfo} = req
    const user = await User.findById(userInfo.id) // or _id
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
    const {userInfo} = req
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, context: 'query' })
    if (!blog) {
        res.statusMessage = `Blog with id ${id} not found`
        res.status(404).end()
        return
    }
    if (blog.user.toString() !== userInfo.id) { // check that id
        res.status(401).json({ error: 'user not authorized' })
        return
    }
    res.status(200).json(blog)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id)

    if (!blog) {
        res.statusMessage = `Blog with id ${id} not found`
        res.status(404).end()
        return
    }
    if (blog.user.toString() !== decodedToken.id) { // check that id
        res.status(401).json({ error: 'user not authorized' })
        return
    }
    await Blog.findByIdAndDelete(id)

    const {userInfo} = req
    const user = await User.findById(userInfo.id)

    user.blogs = user.blogs.filter(b => b.toString() !== id)
    await user.save()
    res.status(204).end()
})

module.exports = router
