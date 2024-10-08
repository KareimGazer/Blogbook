const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = require('./data')

/**
 * returns a blog with non-existing ID
 * @returns {Promise<import('mongodb').ObjectId>}
 */
const nonExistingId = async () => {
    const blog = new Blog({
        title: "Litho Sh*t",
        author: "Michael Lam",
        url: "https://mlam.me/",
        likes: 3,
    })
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
