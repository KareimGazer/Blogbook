const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res, next) => {
    const blogs = await Blog.find()
    res.status(200).json(blogs)
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const blog = Blog.findById(id)
    if (!blog) {
        res.statusMessage = `Blog with id ${id} not found`
        res.status(404).end()
    }
    else {
        res.status(200).json(blog)
    }
})

router.post("/", async (req, res, next) => {
    const blog = new Blog(req.body)
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
})

router.put("/:id", async (req, res, next) => {
    const { id } = req.params
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, context: 'query' })
    res.status(200).json(blog)
})

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params
    const blog = await Plog.findByIdAndDelete(id, { new: true })
    res.status(204).end()
})

module.exports = router
