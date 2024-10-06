const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.length === 0 ? null : blogs.reduce((a, b) => a.likes > b.likes ? a : b)

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    else {
        const authors = _.countBy(blogs, 'author')
        const most_auth = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
        return {
            author: most_auth,
            blogs: authors[most_auth]
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}