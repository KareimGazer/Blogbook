const express = require('express')
const Blog = require('../models/blog')

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<p>Found ${Blog.find().length} blogs</p>
    <p>${new Date().toISOString()}</p>`)
})

module.exports = router