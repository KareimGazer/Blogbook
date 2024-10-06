const express = require('express')
const Blog = require('../models/blog')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find()
        res.send(`<p>Found ${blogs.length} blogs</p>
        <p>${new Date().toISOString()}</p>`)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router